const errorHandler = (err, req, res, next) => {
    console.log("inside error handler")
    let statusCode = err.statusCode ? err.statusCode : 500
    res.status(statusCode)
    res.json({ message: err.message, stack: err.stack })
}
module.exports = { errorHandler }