# Back-end Node.js com MySQL e Sequelize

## Instalando pacotes e configuranado ambiente:
Instalando Pacotes.
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
## Criando Index e configurando o Config
O Index.js que fica fora de todas as pastas tem a função de gerenciar o servidor, e é onde, neste projeto são definidas as rotas. Já o Config.json já deve ter sido criado automaticamente com a instalação do pacote do MySQL, deve-se conferir neste arquivo principalmente a senha e o nome do banco de dados. Essas informações podem utilizar uma rota para um .env para ter maior segurança.
- Possuindo a extensão node-snippets instalada no VScode com o comando `node-express` no index.js, será gerada o seguinte código:
```JavaScript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
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
## Model
Na pasta models, já vem o arquivo index.js, este arquivo deve permanecer intocado, ele é importante para a relação com o controller.

Cria-se o model `User.js`, que deve conter os tipos de dados dos campos da migrate, ele deve seguir o seguinte exemplo:
```JavaScript
const User = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
    });
};
module.exports = User;
```
Repare na definição pelo sequelize, e na importação, já que se cria a constante User e depois a exporta(caso seja exportada direto pode dar alguns bugs).
## Controller
Deve ser criada a pasta controllers, e dentro dela os devidos controllers. Neste projeto optou-se pela utilização de uma index no controller também para fazer a comunicação da rota com o controller
- Este index.js fica da seguinte forma:
```JavaScript
const { request } = require('express');
const usersController = require('./usersController');
module.exports = {
    users: usersController,
};
```
Já o controller de user(userController), deve possuir a importação e a definição do `Router` e também a importação do model.
```JavaScript
const { Router } = require('express');
const { User } = require('../models');

const router = Router();
```
As ações vão ocorrer em função das rotas, então toda a parte logica do que deve ser feito com a informação deve estar dentro de uma função disparada pela rota. Estas funções seguem este exemplo:
```JavaScript
router.post('/push', async (req, res) => {
    const { name, email } = req.body;
    const newuser = await User.create({ name, email });
    return res.json(newuser);
});
```
É importante se atentar a exportação das rotas que acontece por meio do:
```JavaScript
module.exports = router;
```
## Rotas
As rotas ficam na index.js de fora das pastas, para adicionar essas rotas neste projeto adicona-se o Body Parser, para garantir o uso de json nas comunicações do banco de dados e do navegador.
```JavaScript
// Importação
const bodyParser = require('body-parser');
// Aplicação
app.use(bodyParser.json());
```
Para definir as rotas deve-se seguir o seguinte modelo,lembrando de importar os controllers, como existe um `Index.js` na pasta controllers, só precisa importar uma vez.
```JavaScript
// Importação
const controllers = require('./controllers')
// Rota
app.use('/users', controllers.users)
```