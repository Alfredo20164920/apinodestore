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

    if(product.length > 0) {
        res.json(product);
    } else {
        res.json({
            message: `The ${idProduct} id product is not in the list`
        })
    }
});

module.exports = router;