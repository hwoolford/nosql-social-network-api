const { User, Thought } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const user = await User.find()
        .populate("thoughts")
        .populate("friends")
        .select("-__v")
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get one user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .populate("thoughts")
        .populate("friends")
        .select("-__v");
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Remove a user and delete their thoughts
  async removeUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and thoughts deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Add a new friend to a user's friend list
  async addFriend(req, res) {
    console.log('You are adding a new friend');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.friendId } },
        { runValidators: true, new: true}
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      console.log('User ID:', req.params.userId);
      console.log('Friend ID:', req.params.friendId);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true}
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
        res.json({ message: 'Friend deleted successfully' });
        console.log(user)
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
