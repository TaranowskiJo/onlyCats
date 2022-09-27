const express = require('express');
// connect these to server product.controller
//back end
const {
    createCat,
    getAllCats,
    getCatById,
    getCatByCity,
    deleteCatById,
    likeCatById,
    updateCatById,
} = require('../controllers/cat.controller');

const router = express.Router()


// Notice, CreateAuthor is not called now, it's called back later
// when the route is visited.
router.get('/', getAllCats);
router.post('/', createCat);
// router.post('/many', createManyCats);  //not needed for belt, but allows you to pass in multiple destinations to create at the same time

// data at the :id spot in url is accessed with req.params.id.
// route params can be named anything and the name will be added to req.params.
router.get('/:id', getCatById);
router.get('/city/:city', getCatByCity);
router.delete('/:id', deleteCatById);
router.put('/:id', likeCatById);
router.put('/:id', updateCatById);

module.exports = { catRouter: router };