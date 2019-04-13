let async = require('async');
let supportDbo = require('../dbos/support.dbo');
let lodash = require('lodash');
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

let getQueries = (req, res) => {
    let {
        name,
        phone,
        email,
        searchKey,
        startDate,
        endDate,
        status
    } = req.query;
    if (!startDate) startDate = new Date((new Date() - 7 * 24 * 60 * 60 * 1000));
    if (!endDate) endDate = new Date();
    let searchObj = {};
    if (name) searchObj['name'] = name;
    if (phone) searchObj['phone'] = phone;
    if (email) searchObj['email'] = email;
    if (status) searchObj['status'] = status;
    searchObj['askedOn'] = {
        $lt: endDate,
        $gte: startDate
    }
    async.waterfall([
        (next) => {
            supportDbo.getQueries(searchObj, (error, queries) => {
                if (error) {
                    next({
                        status: 500,
                        message: '  Error while getting queries'
                    }, null);
                } else {
                    next(null, queries);
                }
            });
        },
        (queries, next) => {
            let searched = [];
            let final = [];
            if (searchKey) {
                searchKey = searchKey.toLowerCase();
                lodash.forEach(queries,
                    (query) => {
                        if ((query.message).toLowerCase().indexOf(searchKey) > -1) {
                            searched.push(query);
                        }
                    });
                final = searched;
            } else {
                final = queries;
            }
            next(null, {
                status: 200,
                queries: final
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
    saveQuery,
    getQueries
};