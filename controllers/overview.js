const Goal = require("../models/goal");
const User = require("../models/user");

const overviewRouter = require("express").Router();

overviewRouter.get("/", async (req, res) => {
  if (!req.decodedToken) {
    return res.status(401).json({ error: "invalid token" });
  }

  const user = await User.findById(req.decodedToken.id);
  if (!user) {
    return res.status(404).json({ error: "no such user" });
  }

  const goalsOverview = await Goal.find({ _id: { $in: user.goals } }).populate({
    path: "insertionNode",
    match: { isComplete: false },
  });

  res.json(goalsOverview);
});

module.exports = overviewRouter;
