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
const SearchService_1 = __importDefault(require("./src/service/SearchService"));
const cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors({ origin: '*' }));
app.get('/', (_req, res) => res.json({ message: 'Sanity' }));
app.get('/:web/:category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, web } = req.params;
        const { q: query } = req.query;
        const result = yield SearchService_1.default.getProducts(web, category, query);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
app.listen(3001, () => console.log('Started on port 3001'));
