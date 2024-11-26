const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");

class ProductsService {
    constructor () {
        this.products = [];
        this.generate();
    }

    generate() {
        for(let i = 0; i < 100; i++) {
            this.products.push({
                id: faker.string.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price()),
                image: faker.image.urlPicsumPhotos(),
                isHidden: faker.datatype.boolean()
            })
        }
    }

    async create(product) {
        const newProduct = {
            id: faker.string.uuid(),
            ...product
        }

        this.products.push(newProduct);
        return newProduct;
    }

    async getAll() {
        return this.products;
    }

    async getById(idProduct) {
        // const name = this.getTotal();
        const product = this.products.filter(({id}) => id == idProduct);
        const isExist = this.products.some(({id}) => id == idProduct);
        if(!isExist) throw boom.notFound ("Product not found");
        if(product[0].isHidden) throw boom.conflict("Product is hidden");
        
        return product[0]; 
    }

    getByName() {

    }

    async update(idProduct, data) {
        const index = this.products.findIndex(({id}) => id == idProduct);
        if(index == -1) throw new Error ("Product not found");
        
        this.products[index] = {
            ...this.products[index],
            ...data
        };
        return this.products[index];
    }

    async delete(idProduct) {
        const index = this.products.findIndex(({id}) => id === idProduct);
        if(index === -1) throw new Error ("Product not found");

        this.products.splice(index, 1);
        return {idProduct};
    }
}

module.exports = ProductsService;