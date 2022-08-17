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

router.delete('/:id', async (req, res) => {
    await User.destroy({ where: { id: req.params.id } });
    id = req.params.id
    return res.json(`Usuario de id = ${id} deletado`)
})

module.exports = router;