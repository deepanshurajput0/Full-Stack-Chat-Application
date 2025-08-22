"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerController = registerController;
exports.loginController = loginController;
const db_1 = __importDefault(require("../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function registerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, profilePic } = req.body;
            if (!name || !email || !password || !profilePic) {
                return res.status(400).json({ message: 'All Fields are required' });
            }
            const user = yield db_1.default.user.findUnique({
                where: {
                    email
                }
            });
            if (user) {
                return res.status(400).json({ message: 'User Already exists try new email' });
            }
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const createdUser = yield db_1.default.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    profilePic
                }
            });
            const token = jsonwebtoken_1.default.sign({ id: createdUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            return res.status(201).json({
                message: 'user created successfully',
                token
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server error', error });
        }
    });
}
function loginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const user = yield db_1.default.user.findUnique({ where: {
                    email
                } });
            if (!user) {
                return res.status(400).json({ message: 'Incorrect user & password' });
            }
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect user & password' });
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
            return res.status(201).json({
                message: 'user loggedIn successfully',
                token
            });
        }
        catch (error) {
            return res.status(500).json({ message: 'Internal Server error', error });
        }
    });
}
