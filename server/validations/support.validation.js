let joi = require('joi');

let saveQuery = (req, res, next) => {
    let saveQuerySchema = joi.object().keys({
        name: joi.string().required(),
        email: joi.string(),
        phone: joi.string().required(),
        message: joi.string().required()
    });
    let {
        error
    } = joi.validate(req.body, saveQuerySchema);
    if (error) res.status(422).send({
        success: false,
        error
    });
    else next();
};
let getQueries = (req, res, next) => {
    let getQueriesSchema = joi.object().keys({
        name: joi.string(),
        email: joi.string(),
        phone: joi.string(),
        searchKey: joi.string(),
        startDate: joi.date(),
        endDate: joi.date()
    });
    let {
        error
    } = joi.validate(req.query, getQueriesSchema);
    if (error) res.status(422).send({
        success: false,
        error
    });
    else next();
};

module.exports = {
    saveQuery,
    getQueries
};