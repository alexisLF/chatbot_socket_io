const express = require('express');
const { getOne, createMsg, updateMsg, deleteMsg, getAll } = require('../controllers/message');
const router = express.Router();


// const mAuth = require('../middlewares/auth');

router.get('/', getAll);
router.post('/', createMsg)
// router.post('/', mAuth, createMsg);  
router.get('/:id', getOne);
router.put('/:id', updateMsg);  
router.delete('/:id', deleteMsg);

module.exports = router;