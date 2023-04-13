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
      default:
        throw new Error('No webpage selected');
    }
  }

  private static async allFonts(
    category: string,
    query: (string | undefined)
  ) {
    const mercadoLivre = await MercadoLivre.search(category, query);
    return mercadoLivre
  }
}

export default SearchService;