const { response, request } = require("express")

const  Cat  = require("../models/cat.model")

module.exports.getAllCats = (req, res )=>{
    Cat.find()
        .sort({'type':1}) //sorts alphabetically
        .then(allCats => {
            res.json({results: allCats});
        })
        .catch(err=>{
            res.status(400).json(err);
        })
}
//params hold id
module.exports.getCatById = (req, res )=>{
    Cat.findById(req.params.id)
        .then(aCat => {
            console.log(res)
            res.json({results: aCat});
        })
        .catch(err=>{
            res.status(400).json(err);
        })
}

module.exports.getCatByCity = (req, res)=>{
    console.log(req);
    Cat.find({city: req.params.city})
        .then(allCats => {
            res.json({results: allCats});
        })
        .catch(err=>{
            res.status(400).json(err);
        })
}

module.exports.createCat = (req,res) =>{
    Cat.create(req.body)
        .then(newCat=>{
            res.json({results: newCat})
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    }

module.exports.updateCatById = (req, res) =>{
    Cat.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        { new:true, runValidators: true}
    )
        .then(updatedCat =>{
            res.json({results:updatedCat})
        })
        .catch(err=>{
            res.status(400).json(err)
        })
}


module.exports.deleteCatById = (req, res)=>{
    Cat.deleteOne({_id: req.params.id})
        .then(cat =>{
            res.json({results: cat})
        })
        .catch(err=>{
            res.status(400).json(err)
        })
}


module.exports.likeCatById = (req, res)=>{
    Cat.likeOne({_id: req.params.id})
        .then(cat =>{
            res.json({results: cat})
        })
        .catch(err=>{
            res.status(400).json(err)
        })
}