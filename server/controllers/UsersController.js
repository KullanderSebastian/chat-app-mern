import User from "../models/user.model.js";
import Friend from "../models/friends.model.js";
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
                username: user.username,
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

    async getUser(req, res) {
        try {
            let objName;
            let query;

            if (req.body.username) {
                objName = "username";
                query = req.body.username;
            } else if (req.body.objectId) {
                objName = "_id";
                query = req.body.objectId;
            }

            let user = await User.findOne({
                objName: query,
            });

            return res.status(200).send({
                success: true,
                data: user,
            });
        } catch(error) {
            console.error(error);

            return res.status(500).json({
                error: true,
                message: error,
            });
        }
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

            user.password = hashedPassword;

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

    async changeUser(req, res) {
        try {
            console.log("enter changeUser");
            let field = req.body.field;

            let user = await User.findOneAndUpdate({
                username: req.body.username,
            },
            {
                [field]: req.body.value
            }, {new: true});

            await user.save();

            return res.status(200).send(user);
        } catch(error) {
            console.error(error);

            return res.status(500).json({
                error: true,
                message: error
            });
        }
    }

    async getAllFriends(req, res) {
        try {
            User.findById(req.body.userId)
                .populate("friends")
                .exec((err, user) => {
                    if (err) {
                        console.error(err);
                    } else {
                        const friendsReferencesIds = user.friends.map(friend => friend._id);
                        Friend.aggregate([
                            { $match: { _id: { $in: friendsReferencesIds } } },
                        ]).exec((err, friends) => {
                            if (err) {
                                console.error(err);
                            } else {
                                return res.status(200).send(friends);
                            }
                        });
                    }
                })
        } catch(error) {
            console.error(error);
        }
    }
}

export default UsersController;
