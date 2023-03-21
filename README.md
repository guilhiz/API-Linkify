<h1 align="center">API Linkify :link:</h1>


## :memo: Descrição
Linkify é uma API Node.js que permite encurtar URLs, mantendo um registro de visitas e permitindo autenticação de usuário para armazenar URLs. Os dados são armazenados em um banco de dados PostgreSQL, com arquitetura em camadas e validação de entradas contra esquemas usando um middleware.


## :gear: Funcionalidades

   - Encurtar qualquer URL
   - Manter um contador de visitas
   - Autenticação de usuário (cadastro e login) para armazenar todas as URLs do usuário
   - Redirecionamento para a URL correta armazenada no banco de dados
   - Armazenamento de dados em um banco de dados SQL (PostgreSQL)
   - Arquitetura em camadas (controllers, middlewares, services, etc)
   - Classificação de usuários pelo número de visitas em todas as URLs
   - Todas as entradas são validadas contra esquemas (usando um middleware)
   - Segurança reforçada com o uso da biblioteca Helmet do Node.js

## :robot: Tecnologias Utilizadas

- [Node](https://nodejs.org/pt-br/)
- [Express](https://expressjs.com/pt-br/)
- [pg](https://www.npmjs.com/package/pg)
- [dotenv](https://github.com/motdotla/dotenv)
- [postgreSQL](https://www.postgresql.org/)
- [uuid](https://www.npmjs.com/package/uuid)
- [string-strip-html](https://www.npmjs.com/package/string-strip-html)
- [helmet](https://helmetjs.github.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [joi](https://www.npmjs.com/package/joi)


## :file_folder: Estrutura dos Principais Arquivos

```
├── 📁public  
|   └── 📄Index.html
|
├── 📁src
|   ├── 📁controllers
|   ├── 📁database
|   ├── 📁midllewares
|   ├── 📁repositories
|   ├── 📁routes
|   ├── 📁schemas
|   ├── 📁utils
|   └── 📄index.js
|
├── 📄README.md
├── 📄dump.sql
└── 📄package.json

```

