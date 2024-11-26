function logErrors (error, req, res, next) {
    console.error("Log");
    console.error(`Error: ${error}`);
    next(error);
}

function  errorHandler(error, req, res, next) {
    console.error("error handler");

    res.status(500).json({
        message: error.message,
        stack: error.stack
    });
    
    console.error(`Error: ${error}`);

    next(error);
}

function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    }

    next(err);
}

module.exports = {logErrors, errorHandler, boomErrorHandler};