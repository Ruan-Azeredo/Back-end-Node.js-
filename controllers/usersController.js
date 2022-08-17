const { Router } = require('express');
const { User } = require('../models');

const router = Router();

router.get('/all', async (req, res) => { //ver todos os usuarios
    const users = await User.findAll();
    return res.json(users);
});

router.post('/create', async (req, res) => { // criar novo usuario
    const { name, email } = req.body;
    const newuser = await User.create({ name, email });
    return res.json(newuser);
});

router.get('/:id', async (req, res) => { //mostra o usuario de determinado id
    const user = await User.findByPk(req.params.id);
    return res.json(user);
});

router.delete('/:id', async (req, res) => { //deleta um usuario de determinado id
    await User.destroy({ where: { id: req.params.id } });
    id = req.params.id
    return res.json(`Usuario de id = ${id} deletado`)
});

router.put('/:id', async (req, res) => { //atualiza um usuario de determinado id
    const { name, email } = req.body;
    await User.update(
        { name, email }, { where: { id: req.params.id } }
    ) // substitui o nome e o email onde o id é igual ao id digitado
    
    const updateduser = await User.findByPk(req.params.id); // depois de atualizar, busca o novo id para mostrar, não é tão necessario para o funcionamento da atualização, apenas para mostrar o resultado
    return res.json(updateduser)
});

module.exports = router;