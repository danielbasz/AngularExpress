"use strict";
/**
 * 23S CST 8333 360
 * Author: Daniel Barboza
 * id: 041025651
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const data_routes_1 = __importDefault(require("./routes/data.routes"));
const DATA_FILE_PATH = '../dataset/32100260.csv';
/**
 * Defines express as the framework of our app and adds 'cors' for easing different
 * port communication between our front end and back end
 */
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// our routes
app.use('/api', data_routes_1.default);
/**
 * Opens server listening on port 3000
 */
app.listen(3000, () => console.log('Sever started on port 3000'));
