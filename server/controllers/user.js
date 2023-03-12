const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Post = require("../models/Post");
const uploadImage = require("../utils/uploadImage");
const Token = require("../models/Token");

const options = { new: true, runValidators: true };

const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;
        await User.findByIdAndDelete(userId);
        const removedToken = await Token.findOne({ userId });
        return res.send(null);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже"
        });
    }
};

const getUsers = async (req, res) => {
    const { query = "", id } = req.query;
    const regex = new RegExp(query, "i");
    if (id) {
        const user = await User.findById(id).select({ password: 0 });
        if (!user) throw new NotFoundError(`No user exist with id ${id}`);
        res.status(StatusCodes.OK).json({ user });
    } else {
        const users = await User.find({ name: regex }).select({ password: 0 });
        res.status(StatusCodes.OK).json({ users });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.user;
    const user = await User.findByIdAndUpdate(id, req.body, options).select({
        password: 0
    });
    if (!user) throw new NotFoundError(`No user exist with id ${id}`);
    await Post.updateMany(
        { createdBy: id },
        { userDetails: { name: user.name, image: user.profileImage } }
    );
    res.status(StatusCodes.OK).json({ user });
};

const updateDP = async (req, res) => {
    const image = req.files?.image;
    if (!image) throw new BadRequestError("Expected an image");
    const { secure_url: profileImage } = await uploadImage(image);
    const { id } = req.user;
    const user = await User.findByIdAndUpdate(
        id,
        { profileImage },
        options
    ).select({ password: 0 });
    if (!user) throw new NotFoundError(`No user exist with id ${id}`);
    await Post.updateMany(
        { createdBy: id },
        { userDetails: { name: user.name, image: profileImage } }
    );
    res.status(StatusCodes.OK).json({ user });
};

module.exports = { updateUser, updateDP, getUsers, deleteUser };
