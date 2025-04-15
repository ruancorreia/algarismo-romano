# Quiz App

Este é um aplicativo de quiz que permite aos usuários responder perguntas e visualizar suas pontuações. O aplicativo é dividido em um frontend em React e um backend em Node.js com MongoDB.

## Funcionalidades

- Responder perguntas de múltipla escolha.
- Visualizar pontuações no ranking.
- Adicionar e remover perguntas (admin).
- Armazenar pontuações no banco de dados.

## Tecnologias Utilizadas

- **Frontend**: React, React Router
- **Backend**: Node.js, Express, Mongoose
- **Banco de Dados**: MongoDB
- **Estilização**: CSS

## Pré-requisitos

Antes de começar, você precisará ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [MongoDB](https://www.mongodb.com/) (ou usar o MongoDB Atlas)

## Configuração do Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/quiz-app.git
cd quiz-app
```

### 2. Configurar o Backend

1. Navegue até a pasta do backend:

   ```bash
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na pasta do backend e adicione sua string de conexão do MongoDB:

   ```plaintext
   MONGO_URI= sua_string_de_conexão
   ```

4. Inicie o servidor:

   ```bash
   npm start
   ```

### 3. Configurar o Frontend

1. Navegue até a pasta do frontend:

   ```bash
   cd ../frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o aplicativo:

   ```bash
   npm start
   ```

## Uso

1. Acesse o aplicativo no navegador em `http://localhost:3000`.
2. Insira seu nome e clique em "Iniciar Quiz".
3. Responda às perguntas e veja sua pontuação ao final.
4. Como administrador, você pode adicionar ou remover perguntas acessando a página de administração.

## Contribuição

Se você deseja contribuir para este projeto, sinta-se à vontade para abrir um pull request ou relatar problemas.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
