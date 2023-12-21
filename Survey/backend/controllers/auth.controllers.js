const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send({ error: "Invalid email/password", message: "Authentication failed" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).send({ error: "Invalid email/password", message: "Authentication failed" });
        }

        const { password: hashedPassword, _id, ...userDetails } = user.toJSON();
        const token = jwt.sign({ ...userDetails }, process.env.JWT_SECRET, { expiresIn: "1 days" });

        res.status(200).send({
            user: userDetails,
            token,
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send({ error: "Internal Server Error", message: "Something went wrong during login" });
    }
};

const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, userType } = req.body;

        if (!email || !password || !firstName || !lastName || !userType) {
            return res.status(400).send({ error: "All fields are required", message: "Registration failed" });
        }

        const user = new User({
            userType,
            email,
            password,
            firstName,
            lastName,
        });

        await user.save();

        res.status(200).send({ user });
    } catch (error) {
        console.error("Error in register:", error);
        res.status(500).send({ error: "Internal Server Error", message: "Something went wrong during registration" });
    }
};

module.exports = {
    login,
    register,
};
