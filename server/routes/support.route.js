let supportController = require('../controllers/support.controller');
let supportValidation = require('../validations/support.validation');
module.exports = (server) => {
    server.post('/support', supportValidation.saveQuery, supportController.saveQuery);
    server.get('/queries', supportValidation.getQueries, supportController.getQueries);
};