"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const multer_js_1 = __importDefault(require("../config/multer.js"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/register', multer_js_1.default.single('profilePic'), userController_1.registerController);
router.post('/login', userController_1.loginController);
router.get('/me', authMiddleware_1.authMiddleware, userController_1.currentUser);
router.get('/users', authMiddleware_1.authMiddleware, userController_1.getAllUsers);
exports.default = router;
