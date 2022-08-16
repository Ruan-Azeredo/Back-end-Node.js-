# Back-end Node.js com MySQL e Sequelize

## Instalando pacotes e configuranado ambiente:
Instalando Pacotes
```bash
# Para instalar o pacote Express, o MySQL, o Sequelize, o Nodemon e o Body Parser
npm i express mysql2 sequelize nodemon body-parser

# Para instalar a CLI do sequelize
npm install -D sequelize-cli
```
Para ver os comando do Sequelize:
```bash
npx sequalize -h
```

Para criar as pastar `config`, `migrations`, `models` e `seeders`:
```bash
npx sequalize init
```
## Migrate
Criando a migrate
```bash
npx sequelize migration:generate --name reate-users-table
```

A migration é criada tanto com o `up` quanto o `down` no formato de arrowfunctions, como neste exemplo:
```JavaScript
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
    }
}
```