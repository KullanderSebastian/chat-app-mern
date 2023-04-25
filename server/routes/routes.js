import express from "express";
import UsersController from "../controllers/UsersController.js";
import FriendsController from "../controllers/FriendsController.js";
const router = express.Router();

import cleanBody from "../middlewares/cleanBody.js";
import validateToken from "../middlewares/validateToken.js";

const users = new UsersController();
const friends = new FriendsController();

router.post("/signup", cleanBody, users.signup);

router.patch("/login", cleanBody, users.login);

router.patch("/logout", cleanBody, users.logout);

router.post("/checktoken", validateToken, users.checkToken);

router.patch("/getuser", cleanBody, users.getUser);

router.patch("/getuserid", cleanBody, users.getUserId);

router.post("/changepassword", cleanBody, users.changePassword);

router.post("/changeuser", cleanBody, users.changeUser);

router.patch("/getallfriends", cleanBody, users.getAllFriends);

router.post("/addfriend", cleanBody, friends.addFriend);

router.post("/updateusersfriendsref", cleanBody, friends.updateUsersFriendsRef);

export default router;
