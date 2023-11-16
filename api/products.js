import data from '../db.json';

export default (req, res) => {
    res.status(200).json(data);
};