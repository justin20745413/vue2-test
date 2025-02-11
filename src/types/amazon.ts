export interface SearchParams {
  asin: string[];
  country: string;
  more_info_query: string;
  fields: string;
}

export interface product {
  product_title: string;
  product_price: string;
  product_original_price: string;
  product_star_rating: string;
  product_num_ratings: number;
  product_description: string;
  product_url: string;
  product_photo: string;
  product_availability: string;
  sales_volume: string;
}
