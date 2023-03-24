const express = require("express");
const { getStories, addStory, deleteStory } = require("../controllers/stories");
const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route("/story").get(isAuthenticated, getStories).post(isAuthenticated,  addStory);
router.route("/story/:id").delete(isAuthenticated, deleteStory)

module.exports = router;
