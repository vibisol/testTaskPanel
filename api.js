const data = require('../TestTaskPanel/db.json');

module.exports = (req, res) => {
    res.status(200).json(data);
};