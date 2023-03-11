const express = require("express");
const router = express.Router({ mergeParams: true });
const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");
const postsRouter = require("./post.routes");

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/posts", postsRouter);

module.exports = router;
