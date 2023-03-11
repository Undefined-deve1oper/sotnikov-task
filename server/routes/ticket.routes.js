const express = require("express");
const ticket = require("../controllers/ticket");
const authorize = require("../middleware/authorization");
const router = express.Router({
    mergeParams: true
});

router.get("/", authorize, ticket.getOne);
router.post("/", ticket.create);
router.put("/:ticketId", ticket.update);
router.delete("/:ticketId", ticket.delete);

module.exports = router;
