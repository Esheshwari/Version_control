const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const { authorizeSelfOrAdmin } = require("../middleware/authorizeMiddleware");

const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);

userRouter.get("/users", authMiddleware, userController.getAllUsers);
userRouter.get("/user/:id", authMiddleware, userController.getUserProfile);
userRouter.put("/user/update/:id", authMiddleware, authorizeSelfOrAdmin, userController.updateUserProfile);
userRouter.delete("/user/delete/:id", authMiddleware, authorizeSelfOrAdmin, userController.deleteUserProfile);

module.exports = userRouter;