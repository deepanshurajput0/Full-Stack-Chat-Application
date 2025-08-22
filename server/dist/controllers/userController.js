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
const db_1 = __importDefault(require("../config/db"));
function registerController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, email, password, profilePic } = req.body;
            if (!name || !email || !password || !profilePic) {
                res.status(400).json({ message: 'All Fields are required' });
            }
            const user = yield db_1.default.user.findUnique({
                where: {
                    email
                }
            });
            if (user) {
                res.status(400).json({ message: 'User Already exists try new email' });
            }
            const createdUser = yield db_1.default.user.create({
                data: {
                    name,
                    email,
                    password,
                    profilePic
                }
            });
            if (createdUser) {
                res.status(200).json({ message: 'User registered successfully' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Internal Server error' });
        }
    });
}
