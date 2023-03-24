const express = require("express");
const { getUser, updateUser } = require("../controllers/user");
const { isAuthenticated } = require('../middlewares/authMiddleware');


const router = express.Router()

router.route("/user/:userId").get(isAuthenticated, getUser)
router.route("/me").put(isAuthenticated, updateUser)


module.exports = router;