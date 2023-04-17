import axios from 'axios';
import { load } from 'cheerio';
import { IResult } from './MercadoLivre';
// https://www.buscape.com.br/search?q=brastemp&hitsPerPage=48&refinements%5B0%5D%5Bid%5D=categoryId&refinements%5B0%5D%5Bvalues%5D%5B0%5D=8&page=1&sortBy=default&isDealsPage=false&enableRefinementsSuggestions=true
// https://www.buscape.com.br/search?q=Brastemp&refinements%5B0%5D%5Bid%5D=categoryId&refinements%5B0%5D%5Bvalues%5D%5B0%5D=8  Geladeira
// https://www.buscape.com.br/search?q=Samsung&refinements%5B0%5D%5Bid%5D=categoryId&refinements%5B0%5D%5Bvalues%5D%5B0%5D=3  TV
// https://www.buscape.com.br/search?q=Samsung&refinements%5B0%5D%5Bid%5D=categoryId&refinements%5B0%5D%5Bvalues%5D%5B0%5D=7  Celular

// https://www.buscape.com.br/search?q=&hitsPerPage=48&refinements%5B0%5D%5Bid%5D=categoryId&refinements%5B0%5D%5Bvalues%5D%5B0%5D=8&page=2

const base64Regex = /^data:/
class Buscape {
  private static baseUrl = 'https://www.buscape.com.br/search?q=';
  private static categoryUrl = '&hitsPerPage=48&refinements%5B0%5D%5Bid%5D=categoryId&refinements%5B0%5D%5Bvalues%5D%5B0%5D='

  public static async search(
    category: string,
    query: string | undefined
  ): Promise<IResult[]> {
    const categoryCode = this.categorySelect(category);
    const siteUrl = `${this.baseUrl}${query || ''}${this.categoryUrl}${categoryCode}`;
    const redirUrl = `https://www.buscape.com.br/${category.toLowerCase()}`;
    const searchRes = await this.productScrape(siteUrl, redirUrl);

    const photoSolve = searchRes.map(async (element) => {
      const photo = base64Regex.test(element.photo) ?
        await this.fixImageSrc(element.permalink) : element.photo;
      return { ...element, photo };
    });

    const result = await Promise.all(photoSolve);

    return result.map((product, index) => ({id: `${index}`, category, ...product}))
  }

  private static categorySelect(category: string) {
    switch (category) {
      case 'Geladeira':
        return 8;
      case 'TV':
        return 3;
      case 'Celular':
        return 7
      default:
        throw new Error('Select a category');
    }
  }

  private static async productScrape(url: string, redirectUrl: string) {
    return axios.get(url).then(({ data }) => {
      const doc = load(data);

      return doc('.SearchCard_ProductCard_Inner__7JhKb')
        .map((_, element) => {
          const description = doc(element)
            .find('.SearchCard_ProductCard_Name__ZaO5o').text();
          const photo = doc(element).find('img').attr('src') || '';
          const price = doc(element)
            .find('p.Text_Text__h_AF6.Text_MobileHeadingS__Zxam2').text();
          const permalink = `${redirectUrl}${doc(element).attr('href')}`;

          return { description, photo, price, permalink }
        }).toArray();
    });
  }

  private static async fixImageSrc(url: string) {
    return await axios.get(url).then(({ data }) => {
      const doc = load(data);

      const product = doc('img.swiper-lazy').attr('data-src') || '';

      return product
    })
  }
}

export default Buscape