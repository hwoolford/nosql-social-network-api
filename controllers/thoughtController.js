const { User, Thought} = require('../models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thought = await Thought.find()
            .select("-__v");
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get single thought
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v");

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create a thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);

            const user = await User.updateOne(
                { _id: req.params.userId },
                { $push: { thoughts: req.body } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Update a thought
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove a thought
    async removeThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            console.log('Thought has been deleted');
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add a reaction to a thought
    async createReaction(req, res) {
        console.log('You are adding a new reaction');
        console.log(req.body);

        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true}
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Remove a reaction from a thought
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reaction: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true}
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}