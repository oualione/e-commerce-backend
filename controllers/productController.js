const Product = require('../models/product')

const fs = require('fs')

const _ = require('lodash')

const formidable = require('formidable')

const Joi = require('joi')
const product = require('../models/product')

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm()

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Bad Request ! File Could Not Be Uploaded ! '
            })
        } else {

            let product = new Product(fields)
            if (files.photo) {
                product.photo.data = fs.readFileSync(files.photo.filepath)
                product.photo.contentType = files.photo.mimetype
            }

            const schema=Joi.object({
                name:Joi.string().required(),
               description:Joi.string().required()
            }).options({ stripUnknown: true });
            const{error}=schema.validate(fields);
            if(error){
               return res.status(400).json({
                    error:error.details[0].message
                })
            }

            product.save((err, product) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Bad Request ! Something went wrong !'
                    })
                }
                res.json({
                    product
                })
            })
        }


    })
}


exports.productById = (req, res, next, id) => {
    Product.findById(id)
    .populate('category')
    .exec((err, product) => {
        if(err || !product){
            return res.status(404).json({
                error : err
            })
        }

        req.product = product
        next()
    })
}

exports.showProduct = (req, res) => {
    req.product.photo = undefined;
    res.json({
        product : req.product
    })
}


exports.removeProduct = (req, res) => {

    let product = req.product

    product.remove((err, product) => {
        if(err){
            return res.status(404).json({
                message : 'Product Not Found !'
            })
        }

        res.status(204).json({})
    })

}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm()

    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Bad Request ! File Could Not Be Uploaded ! '
            })
        } else {

            let product = req.product

            product = _.extend(product, fields)
            

            if (files.photo) {
                product.photo.data = fs.readFileSync(files.photo.filepath)
                product.photo.contentType = files.photo.mimetype
            }

            const schema=Joi.object({
                name:Joi.string().required(),
               description:Joi.string().required()
            }).options({ stripUnknown: true });
            const{error}=schema.validate(fields);
            if(error){
               return res.status(400).json({
                    error:error.details[0].message
                })
            }

            product.save((err, product) => {
                if (err) {
                    return res.status(400).json({
                        error: 'Bad Request ! Something went wrong !'
                    })
                }
                res.json({
                    product
                })
            })
        }


    })
}


exports.allProducts = (req, res) => {



    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let orderBy = req.query.orderBy ? req.query.orderBy : 'asc';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6 ;

    let query  = {}

    let {search, category} = req.query

    if(search){
        query.name = {$regex : search, $options : 'i'}
    }
    if(category) {
        query.category = category
    }

    Product.find(query)
           .select("-photo")
           .populate('category')
           .sort([[sortBy,orderBy]])
           .limit(limit)
           .exec((err, products) => {
            if(err){
                return res.status(404).json({
                    error : 'Product Not Found !'
                })
            }
            res.json({
                products
            })
           })
}


exports.relatedProduct = (req, res) => {

    let limit = req.query.limit ? parseInt(req.query.limit) : 3 ;

    Product.find({ category : req.product.category , _id : {$ne : req.product._id}})
            .limit(limit)
            .select("-photo")
            .populate('category', 'name')
            .exec((err, products) => {
                if(err){
                    return res.status(404).json({
                        error : 'Product Not Found !'
                    })
                }
                res.json({
                    products
                })
            })

}

exports.searchProduct = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let orderBy = req.query.orderBy ? req.query.orderBy : 'asc';
    let limit = req.body.limit ? parseInt(req.body.limit) : 10 ;
    let skip = parseInt(req.body.skip);
    let findArgs = {}

    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0){
            if(key === 'price'){
                findArgs[key] = { 
                    $gte : req.body.filters[key][0],
                    $lte : req.body.filters[key][1]
                 }
            }
            else{
                findArgs[key] = req.body.filters[key]
            }
    }
}

    Product.find(findArgs)
           .select("-photo")
           .populate('category')
           .sort([[sortBy,orderBy]])
           .limit(limit)
           .skip(skip)
           .exec((err, products) => {
            if(err){
                return res.status(404).json({
                    error : 'Product Not Found !'
                })
            }
            res.json({
                products
            })
           })
}


exports.getProductPhoto = (req, res) => {

    const {data, contentType} = req.product.photo ;

    if(data){
        res.set('Content-Type', contentType)

        res.send(data)
    }

}


