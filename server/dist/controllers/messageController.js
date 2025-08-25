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
exports.getMessages = getMessages;
const db_1 = __importDefault(require("../config/db"));
function getMessages(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const { id } = req.params;
            if (!id && !((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                return res.status(400).json({ error: "userId and otherUserId are required" });
            }
            const messages = yield db_1.default.message.findMany({
                where: {
                    OR: [
                        {
                            senderId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id,
                            receiverId: Number(id)
                        }, {
                            senderId: Number(id),
                            receiverId: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id
                        }
                    ]
                },
                orderBy: {
                    createdAt: 'asc'
                }
            });
            return res.status(200).json(messages);
        }
        catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
}
