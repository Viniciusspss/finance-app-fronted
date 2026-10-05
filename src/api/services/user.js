import { graphqlRequest } from '@/lib/graphql'

const USER_FIELDS = `
  id
  first_name
  last_name
  email
`

const USER_WITH_TOKENS_FIELDS = `
  ${USER_FIELDS}
  tokens {
    acessToken
    refreshToken
  }
`

const adaptUser = (user) => ({
  id: user.id,
  firstName: user.first_name,
  lastName: user.last_name,
  email: user.email,
})

const adaptUserWithTokens = (user) => ({
  ...adaptUser(user),
  tokens: {
    accessToken: user.tokens.acessToken,
    refreshToken: user.tokens.refreshToken,
  },
})

export const UserService = {
  signup: async (input) => {
    const data = await graphqlRequest({
      query: `
        mutation Register($input: RegisterInput!) {
          register(input: $input) {
            ${USER_WITH_TOKENS_FIELDS}
          }
        }
      `,
      variables: {
        input: {
          first_name: input.firstName,
          last_name: input.lastName,
          email: input.email,
          password: input.password,
        },
      },
    })
    return adaptUserWithTokens(data.register)
  },
  login: async (input) => {
    const data = await graphqlRequest({
      query: `
        mutation Login($input: LoginInput!) {
          login(input: $input) {
            ${USER_WITH_TOKENS_FIELDS}
          }
        }
      `,
      variables: { input },
    })
    return adaptUserWithTokens(data.login)
  },
  me: async () => {
    const data = await graphqlRequest({
      query: `
        query Me {
          me {
            ${USER_FIELDS}
          }
        }
      `,
      authenticated: true,
    })
    return adaptUser(data.me)
  },
  getBalance: async (input) => {
    const data = await graphqlRequest({
      query: `
        query Balance($from: String!, $to: String!) {
          balance(from: $from, to: $to) {
            earnings
            expenses
            investments
            earningPercentage
            expensePercentage
            investmentPercentage
            balance
          }
        }
      `,
      variables: input,
      authenticated: true,
    })
    return data.balance
  },
}
