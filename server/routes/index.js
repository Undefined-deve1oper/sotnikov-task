const express = require("express");
const router = express.Router({ mergeParams: true });
const userRouter = require("./user.routes");
const authRouter = require("./auth.routes");
const postRouter = require("./post.routes");
const chatRouter = require("./chat.routes");
const messageRouter = require("./message.routes");
const articleRouter = require("./articles.routes");
const ticketRoutes = require("./ticket.routes");
const schedulerRouter = require("./scheduler.routes");
const authorizationMiddleware = require("../middleware/authorization");

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/posts", postRouter);
router.use("/articles", articleRouter);
router.use("/schedulers", schedulerRouter);
router.use("/ticket", ticketRoutes);
router.use("/chats", authorizationMiddleware, chatRouter);
router.use("/messages", authorizationMiddleware, messageRouter);

module.exports = router;
