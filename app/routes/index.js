const express = require('express');

const productsRouter = require("./products");
const usersRouter = require("./users");

function routing (app) {

    const router = express.Router();
    app.use("/api/v1", router);
    
    router.use("/products", productsRouter);
    router.use("/users", usersRouter);
}

module.exports = routing;