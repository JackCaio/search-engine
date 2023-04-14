import fetch from 'node-fetch'

interface IProduct {
  id: string,
  title: string,
  thumbnail: string,
  domain_id: string,
  price: number,
  permalink: string
}

export interface IResult {
  id: string,
  description: string,
  photo: string,
  category: string,
  price: string,
  permalink: string
}

class MercadoLivre {
  private static apiUrl = 'https://api.mercadolibre.com/sites/MLB/search?category='
  public static async search(category: string, query: (string | undefined) = undefined) {
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
  }

  private static async productFetch<T>(category: string, query: (string | undefined)): Promise<IResult[]> {
    const api = query ?
      `${this.apiUrl}${category}&q=${query}` : `${this.apiUrl}${category}`;
    return fetch(api)
      .then((response) => response.json())
      .then((data) => {
        const result = data.results.map((product: IProduct) => ({
          id: product.id,
          photo: product.thumbnail,
          description: product.title,
          category: product.domain_id,
          price: `R$ ${product.price.toFixed(2)}`,
          permalink: product.permalink,
        }))
        return result as IResult[]
      })
  }
}

export default MercadoLivre