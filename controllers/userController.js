const { User, Thought} = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
        } catch (err) {
            res.status(500).json(err);
        }
    }
}