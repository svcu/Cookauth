const { createUser, isActive, login } = require("./users/userHandler");
//const { getUsers } = require("./users/userHandler");

const router = require("express").Router();

router.post("/user", createUser)
router.post("/login", login)

router.get("/isActive", isActive);





//router.get("/users", getUsers)
module.exports = router;
