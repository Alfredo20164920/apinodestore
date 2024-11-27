const express = require('express');
const ProductsService = require("../../services/products.service");
const { validatorHandler } = require('../../middlewares/validator.handler');
const { getProductSchema, createProductSchema, updateProductSchema } = require('../../schemas/product.dto');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
    try {
        const products = await service.getAll();
        res.json(products);
    } catch (error) {
        res.status(404).json({
            message: "Something went wrong with the request"
        })
    }
});

router.get('/:id', validatorHandler(getProductSchema, "params"), async (req, res, next) => {
    try {
        const idProduct = req.params.id;
        const data = await service.getById(idProduct);
        res.json(data)
    } catch (error) {
        next(error);
            // res.status(404).json({
            //     message: error.message
            // })
    }

    
});

router.post("/", validatorHandler(createProductSchema, "body"), async (req, res) => {
    try {
        const body = req.body;
        const newProduct = await service.create(body);

        res.status(201).json({
            message: "Created",
            data: newProduct
        });
    } catch (error) {
        res.status(404).json({
            message: "The product was not created"
        })
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const idToDelete = req.params.id;
        const data = await service.delete(idToDelete);

        res.json(data);
    } catch (error) {
        res.status(404).json({
            message: error.message
        })    
    }
    

})

router.put("/:id", validatorHandler(updateProductSchema, "params"),async (req, res) => {
    const idToChange = parseInt(req.params.id);
    const body = req.body;

    if(Number.isInteger(idToChange) && !Number.isNaN(idToChange)) {

        res.json({
            "message": "Changed",
            "data": {"id": idToChange, ...body}
        })


    } else {
        res.json({
            "message": "The id is not valid"
        })
    }
})

router.patch("/:id"
    ,validatorHandler(getProductSchema, "params")
    ,validatorHandler(updateProductSchema, "body")
    ,async (req, res) => {
    try {
        const idToChange = req.params.id;
        const body = req.body;
        const product = await service.update(idToChange, body);

        res.json(product);
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})

module.exports = router;