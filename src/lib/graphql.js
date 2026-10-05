import axios from 'axios'

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage'

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

const REFRESH_TOKEN_MUTATION = `
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      acessToken
      refreshToken
    }
  }
`

const createGraphQLError = (errors) => {
  const error = new Error(
    errors.map(({ message }) => message).join('\n') ||
      'Ocorreu um erro ao processar a requisição.'
  )
  error.graphQLErrors = errors
  return error
}

const execute = async ({ query, variables, accessToken }) => {
  const headers = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : undefined
  const response = await api.post('/graphql', { query, variables }, { headers })

  if (response.data.errors?.length) {
    throw createGraphQLError(response.data.errors)
  }

  return response.data.data
}

const isAuthenticationError = (error) => {
  if (error.response?.status === 401) return true

  return error.graphQLErrors?.some(
    ({ extensions }) => extensions?.code === 'UNAUTHENTICATED'
  )
}

let refreshPromise

const refreshTokens = async () => {
  const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
  if (!refreshToken) throw new Error('Refresh token não encontrado.')

  const data = await execute({
    query: REFRESH_TOKEN_MUTATION,
    variables: { input: { refreshToken } },
  })
  const tokens = {
    accessToken: data.refreshToken.acessToken,
    refreshToken: data.refreshToken.refreshToken,
  }

  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken)
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken)
  return tokens
}

export const graphqlRequest = async ({ query, variables, authenticated }) => {
  const accessToken = authenticated
    ? localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
    : undefined

  try {
    return await execute({ query, variables, accessToken })
  } catch (error) {
    if (!authenticated || !isAuthenticationError(error)) throw error

    try {
      refreshPromise ??= refreshTokens().finally(() => {
        refreshPromise = undefined
      })
      const tokens = await refreshPromise
      return await execute({
        query,
        variables,
        accessToken: tokens.accessToken,
      })
    } catch (refreshError) {
      localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY)
      localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY)
      throw refreshError
    }
  }
}
