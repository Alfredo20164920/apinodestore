const productsRouter = require("./products");
const usersRouter = require("./users");

function routing (app) {
    app.use("/api/products", productsRouter);
    app.use("/api/users", usersRouter);
}

module.exports = routing;