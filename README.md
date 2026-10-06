# Finance App Frontend

Aplicação web desenvolvida para o controle de finanças pessoais. A plataforma permite que os usuários acompanhem ganhos, gastos e investimentos, visualizem o saldo por período e gerenciem suas transações de forma simples e organizada.

O projeto foi desenvolvido para a cadeira de Integrar Interfaces com Serviços Web do curso de Sistemas de Informação na UNIFACISA e consome a API do Finance App por meio de GraphQL.

## Equipe

- Miguel Alves
- Danilo Santos
- Gutemberg Filho
- Vinicius Sátiro

## Tecnologias

- **React** – construção da interface e dos componentes
- **Vite** – ambiente de desenvolvimento e build da aplicação
- **JavaScript** – linguagem utilizada no frontend
- **Tailwind CSS** – estilização da interface
- **shadcn/ui e Radix UI** – base para os componentes visuais
- **React Router** – gerenciamento das rotas da aplicação
- **TanStack React Query** – gerenciamento de requisições e cache
- **Axios** – comunicação HTTP com o backend
- **GraphQL** – consultas e mutations da aplicação
- **React Hook Form e Zod** – gerenciamento e validação dos formulários
- **Context API** – gerenciamento do estado de autenticação
- **Lucide React** – ícones da interface
- **ESLint e Prettier** – padronização e qualidade do código
- **Husky e lint-staged** – validações antes dos commits

## Funcionalidades

- Cadastro e autenticação de usuários
- Persistência da sessão com access token e refresh token
- Renovação automática do access token
- Consulta do saldo por período
- Visualização de ganhos, gastos e investimentos
- Listagem de transações
- Cadastro e edição de transações
- Filtragem das informações por intervalo de datas
- Interface responsiva para acompanhamento financeiro

## Rodando o projeto

### Pré-requisitos

Antes de iniciar o frontend, é necessário ter o **Node.js** e o **npm** instalados. O backend do Finance App também deve estar em execução na porta `8080`.

```bash
# Instale as dependências
npm install

# Inicie o frontend em modo de desenvolvimento
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:5173
```

O backend deve estar disponível em:

```text
http://localhost:8080
```

## Comunicação com a API

O frontend utiliza o endpoint GraphQL disponibilizado pelo backend:

```text
POST http://localhost:8080/graphql
```

As consultas e mutations são organizadas em uma camada de serviços, responsável por enviar as requisições e adaptar as respostas para o formato utilizado pela interface. O React Query gerencia o cache, os estados de carregamento e a atualização dos dados após as mutations.

## Autenticação

A autenticação é gerenciada por um `AuthContext`, responsável pelos fluxos de cadastro, login, recuperação do usuário autenticado e logout.

O access token e o refresh token são armazenados no `localStorage`. Nas operações protegidas, o access token é enviado no header `Authorization` no formato `Bearer <token>`. Quando ele expira, o frontend utiliza o refresh token para solicitar novos tokens e repetir a operação original.

## Estrutura do projeto

```text
src/
├── api/
│   ├── hooks/          # Hooks do React Query
│   └── services/       # Queries e mutations GraphQL
├── assets/             # Fontes e imagens
├── components/         # Componentes da aplicação
│   └── ui/             # Componentes de interface reutilizáveis
├── constants/          # Constantes compartilhadas
├── context/            # Contexto de autenticação
├── forms/
│   ├── hooks/          # Lógica dos formulários
│   └── schemas/        # Schemas de validação com Zod
├── helpers/            # Funções auxiliares
├── lib/                # Cliente GraphQL e utilitários
└── pages/              # Páginas da aplicação
```

## Scripts disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera o build de produção
npm run lint     # Executa a análise do código com ESLint
npm run preview  # Visualiza localmente o build de produção
```

## Interface da aplicação

A interface foi construída com Tailwind CSS e componentes baseados no shadcn/ui. O dashboard apresenta o saldo, os totais de ganhos, gastos e investimentos e a listagem das transações do usuário.

<img src="https://github.com/user-attachments/assets/408e40d1-9829-4c07-99fb-7ee45ecfdafa" alt="Tela de login do Finance App" />

<img src="https://github.com/user-attachments/assets/fe2fe0cf-081a-4638-83b3-d95ffbf4173c" alt="Tela de cadastro do Finance App" />

<img src="https://github.com/user-attachments/assets/23288b83-7aed-4822-b132-c8b8cab0fad2" alt="Dashboard do Finance App" />

<img src="https://github.com/user-attachments/assets/89c81047-8267-478b-b752-536bd02276c2" alt="Cadastro de transação" />

<img src="https://github.com/user-attachments/assets/d2e4fed9-1ef4-4f56-8869-7be3030ec84e" alt="Edição de transação" />
