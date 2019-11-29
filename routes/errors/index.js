const processError = function(error, res) {
    console.log(error);
    // log the error object
    // and send 500 error to the user
    res.status(500).send({Error: 'Ooops! Unhandled Error Occured.'});
}

module.exports = { processError };