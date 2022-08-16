const { Router } = require('express');
const { User } = require('../models');

const router = Router();

router.get('/pull', async (req, res) => {
    const pull = await User.findAll();
    return res.json(pull);
});

router.post('/push', async (req, res) => {
    const { name, email } = req.body;
    const newuser = await User.create({ name, email });
    return res.json(newuser);
});

module.exports = router;