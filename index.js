const express = require('express') //comando 'node-express' com a extensão Node Snippets
const controllers = require('./controllers') //acrescentado
const bodyParser = require('body-parser'); //acrescentado
const cors = require('cors') //acrescentado
const app = express()
const port = 3001

app.use(bodyParser.json()); //acrescentado
app.use(cors()) //acrescentado

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/users', controllers.users) //acrescentado
app.listen(port, () => console.log(`Example app listening on port ${port}!`))