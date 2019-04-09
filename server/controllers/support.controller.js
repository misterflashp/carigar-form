let async = require('async');
let supportDbo = require('../dbos/support.dbo');

let saveQuery = (req, res) => {
    let {
        email,
        message,
        phone,
        name
    } = req.body;
    let details = req.body;
    async.waterfall([
        (next) => {
            supportDbo.saveQuery(details, (error, result) => {
                if (error) next({
                    status: 500,
                    message: 'Error while saving query'
                }, null);
                else next(null, {
                    status: 200,
                    message: 'Query saved successfully'
                })
            });
        }
    ], (error, result) => {
        let response = Object.assign({
            success: !error
        }, error || result);
        let status = response.status;
        delete(response.status);
        res.status(status).send(response);
    });
}

module.exports = {
    saveQuery
};