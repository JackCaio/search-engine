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
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
// https://www.buscape.com.br/search?q=brastemp&hitsPerPage=48&refinements%5B0%5D%5Bid%5D=categoryId&refinements%5B0%5D%5Bvalues%5D%5B0%5D=8&page=1&sortBy=default&isDealsPage=false&enableRefinementsSuggestions=true
// https://www.buscape.com.br/search?q=Brastemp&refinements%5B0%5D%5Bid%5D=categoryId&refinements%5B0%5D%5Bvalues%5D%5B0%5D=8  Geladeira
// https://www.buscape.com.br/search?q=Samsung&refinements%5B0%5D%5Bid%5D=categoryId&refinements%5B0%5D%5Bvalues%5D%5B0%5D=3  TV
// https://www.buscape.com.br/search?q=Samsung&refinements%5B0%5D%5Bid%5D=categoryId&refinements%5B0%5D%5Bvalues%5D%5B0%5D=7  Celular
// https://www.buscape.com.br/search?q=&hitsPerPage=48&refinements%5B0%5D%5Bid%5D=categoryId&refinements%5B0%5D%5Bvalues%5D%5B0%5D=8&page=2
const base64Regex = /^data:/;
class Buscape {
    static search(category, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryCode = this.categorySelect(category);
            const siteUrl = `${this.baseUrl}${query || ''}${this.categoryUrl}${categoryCode}`;
            const redirUrl = `https://www.buscape.com.br/${category.toLowerCase()}`;
            const searchRes = yield this.productScrape(siteUrl, redirUrl);
            const photoSolve = searchRes.map((element) => __awaiter(this, void 0, void 0, function* () {
                const photo = base64Regex.test(element.photo) ?
                    yield this.fixImageSrc(element.permalink) : element.photo;
                return Object.assign(Object.assign({}, element), { photo });
            }));
            const result = yield Promise.all(photoSolve);
            return result.map((product, index) => (Object.assign({ id: `${index}`, category }, product)));
        });
    }
    static categorySelect(category) {
        switch (category) {
            case 'Geladeira':
                return 8;
            case 'TV':
                return 3;
            case 'Celular':
                return 7;
            default:
                throw new Error('Select a category');
        }
    }
    static productScrape(url, redirectUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return axios_1.default.get(url).then(({ data }) => {
                const doc = (0, cheerio_1.load)(data);
                return doc('.SearchCard_ProductCard_Inner__7JhKb')
                    .map((_, element) => {
                    const description = doc(element)
                        .find('.SearchCard_ProductCard_Name__ZaO5o').text();
                    const photo = doc(element).find('img').attr('src') || '';
                    const price = doc(element)
                        .find('p.Text_Text__h_AF6.Text_MobileHeadingS__Zxam2').text();
                    const permalink = `${redirectUrl}${doc(element).attr('href')}`;
                    return { description, photo, price, permalink };
                }).toArray();
            });
        });
    }
    static fixImageSrc(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios_1.default.get(url).then(({ data }) => {
                const doc = (0, cheerio_1.load)(data);
                const product = doc('img.swiper-lazy').attr('data-src') || '';
                return product;
            });
        });
    }
}
Buscape.baseUrl = 'https://www.buscape.com.br/search?q=';
Buscape.categoryUrl = '&hitsPerPage=48&refinements%5B0%5D%5Bid%5D=categoryId&refinements%5B0%5D%5Bvalues%5D%5B0%5D=';
exports.default = Buscape;
