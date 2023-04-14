import Buscape from "../model/Buscape";
import MercadoLivre from "../model/MercadoLivre";

class SearchService {
  public static async getProducts(
    web: string,
    category: string,
    query: (string | undefined)
  ) {
    switch (web) {
      case 'All':
        return this.allFonts(category, query);
      case 'MercadoLivre':
        return MercadoLivre.search(category, query);
      case 'Buscape':
        return Buscape.search(category, query);
      default:
        throw new Error('No webpage selected');
    }
  }

  private static async allFonts(
    category: string,
    query: (string | undefined)
  ) {
    const mercadoLivre = await MercadoLivre.search(category, query);
    const buscape = await Buscape.search(category, query);
    const result = mercadoLivre.concat(buscape);
    return result.sort((a, b) => {
      if(a.description > b.description) {
        return 1;
      } else if(a.description < b.description) {
        return -1
      } else {
        return 0
      }
    })
  }
}

export default SearchService;