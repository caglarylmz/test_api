const express = require("express");
const actions = require("../methods/actions");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello");
});

//@desc Adding new user
//@route POST /adduser
router.post("/register", actions.addNew);
//@desc Authenticate user
//@route POST /authenticate
router.post("/login", actions.authenticate);
//@desc Get info on a user
//@route GET /getinfo
router.get("/getinfo", actions.getInfo);

module.exports = router;
