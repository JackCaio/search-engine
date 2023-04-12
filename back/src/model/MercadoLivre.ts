import fetch from 'node-fetch'

class MercadoLivre {
  private static apiUrl = 'https://api.mercadolibre.com/sites/MLB/search?category='
  public static async search(category: string, query: (string | undefined) = undefined) {
    switch (category) {
      case 'TV':
        return this.productFetch('MLB1002', query);
      case 'Geladeira':
        return this.productFetch('MLB181294', query);
      case 'Celular':
        return this.productFetch('MLB1055', query);
      default:
        throw new Error('Select a category');
    }
  }

  private static async productFetch<T>(category: string, query: (string | undefined)): Promise<T> {
    const api = query ?
      `${this.apiUrl}${category}&q=${query}` : `${this.apiUrl}${category}`;
    return fetch(api)
      .then((response) => response.json())
      .then((data) => data.results as T)
  }
}

export default MercadoLivre