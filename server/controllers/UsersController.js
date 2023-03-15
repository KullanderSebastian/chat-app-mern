import User from "../models/user.model.js";
import hashPassword from "./helpers/hashPassword.js";
import comparePasswords from "./helpers/comparePasswords.js";
import generateJWT from "../middlewares/generateJWT.js";

class UsersController {
    async signup(req, res) {
        try {
            let user = await User.findOne({
                username: req.body.username,
            });

            if (user) {
                return res(400).json({
                    error: true,
                    status: 400,
                    message: "Username is already in use",
                });
            }

            user = req.body;

            const hashedPassword = await hashPassword(req.body.password);

            user.password = hashedPassword;

            const newUser = new User(user);

            await newUser.save();

            return res.status(201).send(user);
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                error: true,
                status: 500,
                message: "Cannot sign up",
            });
        }
    }

    async login(req, res) {
        try {
            let user = await User.findOne({ email: req.body.email });

            if (!user) {
                return res.status(404).json({
                    error: true,
                    message: "Wrong username/password",
                });
            }

            const isValid = await comparePasswords(req.body.password, user.password);

            const { error, token } = await generateJWT(user.email);

            if (error) {
                return res.status(500).json({
                    error: true,
                    message: "Could not create access token, please try again later",
                });
            }

            user.accessToken = token;

            await user.save();

            if (!isValid) {
                return res.status(400).json({
                    error: true,
                    message: "Wrong username/password",
                });
            }

            return res.status(200).send({
                success: true,
                message: "User logged in successfully",
                token: token,
            });
        } catch(error) {
            console.error(error);

            return res.status(500).json({
                error: true,
                message: "Could not login, please try again later",
            });
        }
    }

    async logout(req, res) {
        try {
            const { username } = req.decoded;

            let user = await User.findOne({ username });

            user.accessToken = "";

            await user.save();

            return res.status(200).json({
                success: true,
                message: "User logged out",
            });
        } catch(error) {
            console.error(error);

            return res.status(500).json({
                error: true,
                message: error,
            });
        }
    }

    async checkToken(req, res) {
        return res.status(200).json({
            error: false,
            message: "Token is valid",
        });
    }

    async getUserId(req, res) {
        try {
            let user = await User.findOne({
                username: req.body.username,
            });

            return res.status(200).send({
                success: true,
                data: user._id,
            });
        } catch(error) {
            console.error(error);

            return res.status(500).json({
                error: true,
                message: error,
            });
        }
    }

    async changePassword(req, res) {
        try {
            let user = await User.findOne({
                username: req.body.username,
            });

            const isValid = await comparePasswords(req.body.password, user.password);

            if (!isValid) {
                return res.status(400).json({
                    error: true,
                    message: "Fel lösenord",
                });
            }

            if (req.body.newPassword != req.body.newPasswordCheck) {
                return res.status(404).json({
                    error: true,
                    message: "The passwords are not the same",
                });
            }

            const hashedPassword = await hashPassword(req.body.newPassword);

            user.password = hashPassword;

            await user.save();

            return res.status(201).send(user);
        } catch(error) {
            console.error(error);

            return res.status(500).json({
                error: true,
                message: error,
            });
        }
    }
}

export default UsersController;
