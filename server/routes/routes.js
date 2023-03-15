import express from "express";
import UsersController from "../controllers/UsersController.js";
const router = express.Router();

import cleanBody from "../middlewares/cleanBody.js";
import validateToken from "../middlewares/validateToken.js";

const users = new UsersController();

router.post("/signup", cleanBody, users.signup);

router.patch("/login", cleanBody, users.login);

router.patch("/logout", cleanBody, users.logout);

router.post("/checktoken", validateToken, users.checkToken);

router.patch("/getuserid", [cleanBody, validateToken], users.getUserId);

router.post("/changepassword", cleanBody, users.changePassword);

export default router;
