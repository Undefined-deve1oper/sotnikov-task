const User = require("../models/User");
const Ticket = require("../models/Ticket");

class TicketController {
    async getOne(req, res) {
        try {
            const currentUser = await User.findById(req.user.id);
            if (currentUser.role === "ADMIN") {
                const list = await Ticket.find();
                res.status(200).send(list);
            }
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже"
            });
        }
    }

    async create(req, res) {
        try {
            const newFeedbackTicket = await Ticket.create({
                ...req.body
            });
            res.status(201).send(newFeedbackTicket);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже"
            });
        }
    }

    async update(req, res) {
        try {
            const { ticketId } = req.params;
            const updatedTicket = await Ticket.findByIdAndUpdate(
                ticketId,
                req.body,
                {
                    new: true
                }
            );
            res.send(updatedTicket);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже"
            });
        }
    }

    async delete(req, res) {
        try {
            const { ticketId } = req.params;
            await Ticket.findByIdAndDelete(ticketId);
            return res.send(null);
        } catch (error) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже"
            });
        }
    }
}

module.exports = new TicketController();
