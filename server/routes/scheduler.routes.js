const router = require("express").Router();
const Event = require("../models/Event");
const handleError = require("../utils/schedulerErrors");
const authorize = require("../middleware/authorization");
const {
    createScheduler,
    deleteScheduler,
    editScheduler,
    getAll,
    getSchedulerById
} = require("../controllers/scheduler");

router.get("/", getAll);
router.get("/:id/show", authorize, getSchedulerById);
router.post("/", authorize, createScheduler);
router.put("/:id/update", authorize, editScheduler);
router.delete("/:id/delete", authorize, deleteScheduler);

module.exports = router;
