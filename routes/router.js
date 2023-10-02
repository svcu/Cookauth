const { createUser, getUsers } = require("./users/userHandler");

const router = require("express").Router();

router.post("/user", createUser)
router.get("/users", getUsers)

module.exports = router;
