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
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = 8000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.get("/", (req, res) => {
    res.json({ msg: "Its working fine" });
});
app.use('/api/v1/user', userRoutes_1.default);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
});
let onlineUsers = {};
io.on('connection', (socket) => {
    console.log('New Socket connected:', socket.id);
    socket.on('register', (userId) => {
        if (!userId)
            return;
        onlineUsers[userId] = socket.id;
        console.log('User registered:', userId, 'with socket:', socket.id);
    });
    socket.on('send_message', (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, text, from }) {
        try {
            console.log("Received send_message:", { to, text, from });
            // Save to DB
            const newMessage = yield db_1.default.message.create({
                data: {
                    message: text,
                    senderId: from,
                    receiverId: to
                }
            });
            // Send to receiver if online
            const receiverSocketId = onlineUsers[to];
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('receive_message', newMessage);
            }
            // Send back to sender so UI updates
            socket.emit('receive_message', newMessage);
        }
        catch (err) {
            console.error("Error saving message:", err);
        }
    }));
    socket.on('disconnect', () => {
        for (let userId in onlineUsers) {
            if (onlineUsers[userId] === socket.id) {
                delete onlineUsers[userId];
                console.log('User disconnected:', userId);
                break;
            }
        }
    });
});
server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
