const Category = require("../models/category")






exports.createCategory = (req, res) => {

    const category = new Category(req.body)

        category.save((err, category) => {
            if(err){
                res.status(400).json({
                    error : "Bad Request !"
                })
            }else{
                res.json({
                category : category
            })
            }

            
        })

}


exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err){
            return res.status(404).json({
                error : 'Category Not Found !'
            })
        }

        req.category = category
        next()
    })
}

exports.showCategory = (req, res) => {
    let category = req.category

    res.json({
        category
    })
}

exports.allCategories = (req, res) => {

    Category.find().exec((err, categories) => {
        if(err){
            return res.status(500).json({
                error: err
            })
        }

        res.json({
            categories
        })
    })
}

exports.removeCategogy = (req, res)=>{

    let category = req.category

    category.remove((err, category) => {
        if(err){
           return res.status(404).json({
                error : err
            })
        }
        res.status(204).json({
            message : `Category ${category.name} deleted Successfuly !`
        })
    })
}