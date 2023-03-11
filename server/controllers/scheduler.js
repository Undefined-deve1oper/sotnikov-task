const router = require("express").Router();
const Scheduler = require("../models/Scheduler");
const handleError = require("../utils/schedulerErrors");

const getAll = async (req, res) => {
    const scheduler = await Scheduler.find({});

    try {
        res.status(200).json(scheduler);
    } catch (err) {
        handleError(err, res);
    }
};

const getSchedulerById = async (req, res) => {
    const id = req.params.id;
    const scheduler = await Scheduler.findById(id);

    try {
        res.status(200).json(scheduler);
    } catch (err) {
        handleError(err, res);
    }
};

const createScheduler = async (req, res) => {
    const newScheduler = await new Scheduler(req.body);

    try {
        await newScheduler.save((err, scheduler) => {
            if (err) {
                handleError(err, res);
            } else {
                res.status(200).json(scheduler);
            }
        });
    } catch (err) {
        handleError(err, res);
    }
};

const editScheduler = async (req, res) => {
    const id = req.params.id;

    try {
        const Scheduler = await Scheduler.findOne({ _id: id });
        if (Scheduler) {
            Object.assign(Scheduler, req.body);
            Scheduler.save((err, event) => {
                if (err) {
                    handleError(err, res);
                } else {
                    res.status(200).json(event);
                }
            });
        }
        if (!Scheduler) {
            res.status(404).json({ error: "Scheduler is not found" });
        }
    } catch (err) {
        console.log(err);
        handleError(err, res);
    }
};

const deleteScheduler = async (req, res) => {
    const id = req.params.id;

    try {
        await Scheduler.findByIdAndRemove(id);
        res.status(200).json("Scheduler has been deleted");
    } catch (err) {
        handleError(err, res);
    }
};

module.exports = {
    getAll,
    getSchedulerById,
    createScheduler,
    editScheduler,
    deleteScheduler
};
