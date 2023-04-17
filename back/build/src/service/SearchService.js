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
const Buscape_1 = __importDefault(require("../model/Buscape"));
const MercadoLivre_1 = __importDefault(require("../model/MercadoLivre"));
class SearchService {
    static getProducts(web, category, query) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (web) {
                case 'All':
                    return this.allFonts(category, query);
                case 'MercadoLivre':
                    return MercadoLivre_1.default.search(category, query);
                case 'Buscape':
                    return Buscape_1.default.search(category, query);
                default:
                    throw new Error('No webpage selected');
            }
        });
    }
    static allFonts(category, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const mercadoLivre = yield MercadoLivre_1.default.search(category, query);
            const buscape = yield Buscape_1.default.search(category, query);
            const result = mercadoLivre.concat(buscape);
            return result.sort((a, b) => {
                if (a.description > b.description) {
                    return 1;
                }
                else if (a.description < b.description) {
                    return -1;
                }
                else {
                    return 0;
                }
            });
        });
    }
}
exports.default = SearchService;
