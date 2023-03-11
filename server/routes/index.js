const express = require("express");
const router = express.Router({ mergeParams: true });
const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");

router.use("/users", userRouter);
router.use("/auth", authRouter);

module.exports = router;
