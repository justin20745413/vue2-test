import axios from 'axios';
import { product, SearchParams } from '@/types/amazon';

const API_KEY = '267818dd83msh6bec246007921f1p1dbd15jsne102e75ef62b';
const API_HOST = 'real-time-amazon-data.p.rapidapi.com';

export async function searchProducts(params: SearchParams): Promise<product[]> {
  try {
    const products: product[] = [];

    for (const asin of params.asin) {
      const response = await axios.get(`https://${API_HOST}/product-details`, {
        params: { ...params, asin },
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST,
        },
      });

      const productData = response.data.data;

      if (typeof productData !== 'object' || productData === null) {
        throw new TypeError('Expected a product object');
      }

      products.push({
        product_title: productData.product_title || '無標題',
        product_price: productData.product_price || '未知價錢',
        product_original_price: productData.product_original_price || '',
        product_star_rating: productData.product_star_rating || '無評分',
        product_num_ratings: productData.product_num_ratings || 0,
        product_url: productData.product_url || '未知網址',
        product_photo: productData.product_photo || '',
        product_description: productData.product_description || '無商品描述',
        product_availability: productData.product_availability || '',
        sales_volume: productData.sales_volume || '',
      });
    }

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
