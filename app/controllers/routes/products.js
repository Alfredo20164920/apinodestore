const express = require('express');
const ProductsService = require("../../services/products.service");

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

router.get('/:id', async (req, res) => {
    try {
        const idProduct = req.params.id;
        const data = await service.getById(idProduct);
        res.json(data)
    } catch (error) {
        
        res.status(404).json({
            message: error.message
        })
    }

    
});

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.patch("/:id", async (req, res) => {
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