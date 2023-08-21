const router = require("express").Router();
const authControllers = require("../controllers/authController");
const auth=require("../middleware/auth")

//REGISTER
router.post("/register", authControllers.register);

//LOGIN
router.post("/login", authControllers.login);

// test route to verify if our middleware is working
router.get("/test", auth, (req, res) => {
    res.send("request passed");
  });

module.exports = router;
