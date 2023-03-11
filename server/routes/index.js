const express = require("express");
const router = express.Router({ mergeParams: true });
const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");
const postRouter = require("./post.routes");
const chatRouter = require("./routes/chat");
const messageRouter = require("./routes/message");
const authorizationMiddleware = require("../middleware/authorization");

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/chats", authorizationMiddleware, chatRouter);
router.use("/messages", authorizationMiddleware, messageRouter);

module.exports = router;
