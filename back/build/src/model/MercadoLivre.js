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
const node_fetch_1 = __importDefault(require("node-fetch"));
class MercadoLivre {
    static search(category, query = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (category) {
                case 'Geladeira':
                    return this.productFetch('MLB181294', query);
                case 'TV':
                    return this.productFetch('MLB1002', query);
                case 'Celular':
                    return this.productFetch('MLB1055', query);
                default:
                    throw new Error('Select a category');
            }
        });
    }
    static productFetch(category, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const api = query ?
                `${this.apiUrl}${category}&q=${query}` : `${this.apiUrl}${category}`;
            return (0, node_fetch_1.default)(api)
                .then((response) => response.json())
                .then((data) => {
                const result = data.results.map((product) => ({
                    id: product.id,
                    photo: product.thumbnail,
                    description: product.title,
                    category: product.domain_id,
                    price: `R$ ${product.price.toFixed(2)}`,
                    permalink: product.permalink,
                }));
                return result;
            });
        });
    }
}
MercadoLivre.apiUrl = 'https://api.mercadolibre.com/sites/MLB/search?category=';
exports.default = MercadoLivre;
