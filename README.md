# API de Produtos com Node.js e TypeScript

Esta é uma API RESTful simples para gerenciamento de produtos, desenvolvida com Node.js, TypeScript e MySQL.

## Funcionalidades

- Autenticação de usuários (registro e login)
- CRUD de produtos (criar, ler, atualizar e deletar)
- Listagem de produtos com paginação e filtro
- Autenticação por JWT para rotas protegidas

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express.js
- MySQL
- jsonwebtoken
- bcryptjs
- dotenv

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (ou yarn)
- MySQL instalado e configurado
- Postman (opcional, para testes)

## Configuração

1.  Clone o repositório

2.  Instale as dependências:

    ```bash
    npm install
    ```

3.  Configure as variáveis de ambiente:

    - Crie um arquivo `.env` na raiz do projeto.
    - Adicione as seguintes variáveis:

      ```
      PORT=3000
      DB_HOST=localhost
      DB_USER=seu_usuario
      DB_PASSWORD=sua_senha
      DB_DATABASE=seu_banco_de_dados
      JWT_SECRET=sua_chave_secreta
      ```

4.  Compile o TypeScript:

    ```bash
    npm run build
    ```

5.  Execute o servidor:

    ```bash
    npm start
    ```

## Rotas

### Autenticação

- `POST /auth/register`: Registra um novo usuário.
- `POST /auth/login`: Autentica um usuário e retorna um token JWT.

### Produtos

- `GET /products`: Lista todos os produtos (protegida por autenticação).
  - Query parameters:
    - `page`: Número da página (padrão: 1).
    - `limit`: Número de itens por página (padrão: 10).
    - `filter`: Filtro por nome do produto.
- `GET /products/:id`: Retorna um produto por ID (protegida por autenticação).
- `POST /products`: Cria um novo produto (protegida por autenticação).
- `PUT /products/:id`: Atualiza um produto por ID (protegida por autenticação).
- `DELETE /products/:id`: Deleta um produto por ID (protegida por autenticação).

## Testes

- Utilize o Postman para testar as rotas da API.
- Importe o arquivo `Postman_collection.json` (se fornecido) para o Postman.
- Configure as variáveis de ambiente no Postman para corresponder às variáveis do arquivo `.env`.
- Para rotas protegidas, configure o cabeçalho `Authorization: Bearer <token>` com o token JWT obtido no login.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
