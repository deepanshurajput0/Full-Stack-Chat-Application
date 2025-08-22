"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ msg: "Its working fine" });
});
app.use('/api/v1/user', userRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
