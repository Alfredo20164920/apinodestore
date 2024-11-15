const express = require('express');
const { faker } = require("@faker-js/faker");
const router = express.Router();

const products = [];
for(let i = 0; i < 100; i++) {
    products.push({
        id: i+1,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.urlPicsumPhotos()
    })
}

router.get('/', (req, res) => {
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 10;
    
    const productsToList = products.toSpliced(limit, products.length - 1);

	res.json(productsToList);
});

router.get('/:id', (req, res) => {
	const idProduct = req.params.id;
    const product = products.filter(({id}) => id == idProduct);
    const isExist = products.some(({id}) => id == idProduct);

    if(isExist) {
        res.json(product);
    } else {
        res.status(404).json({
            message: `The ${idProduct} id product is not in the list`
        })
    }
});

router.post("/", (req, res) => {
    const body = req.body;

    res.status(201).json({
        message: "Created",
        data: {
            id: 5000,
            ...body
        }
    });
});

router.delete("/:id", (req, res) => {
    const idToDelete = parseInt(req.params.id);

    if(Number.isInteger(idToDelete) && !Number.isNaN(idToDelete)) {

        const productDeleted = products.filter(({id}) => id == idToDelete)
        console.log(productDeleted[0]);

        if(productDeleted[0]) {
            res.json({
                "message": "Deleted",
                "data": productDeleted[0]
            })
        } else {
            res.json({
                "message": "Id not exists"
            })
        }

    } else {
        res.json({
            "message": "The id is not valid"
        })
    }

})

router.put("/:id", (req, res) => {
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

router.patch("/:id", (req, res) => {
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

module.exports = router;