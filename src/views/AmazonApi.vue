<template>
  <div>
    <h2 class="main-title">AmazonApi 商品展示</h2>

    <AmazonSearchBar @search="handleSearch" />

    <OwlCarousel v-if="items.length > 0" :options="carouselOptions">
      <div v-for="(item, index) in items" :key="index" class="item">
        <div class="item-top">
          <img
            v-if="item.product_photo"
            :src="item.product_photo"
            alt="商品圖片"
            class="company-logo"
          />
          <h3>{{ item.product_title }}</h3>
          <p class="description">{{ item.product_description }}</p>
        </div>

        <div class="item-bottom">
          <div class="price-container">
            <strong>{{ item.product_price }}</strong>
            <span v-if="item.product_original_price" class="original-price">
              {{ item.product_original_price }}
            </span>
          </div>

          <div class="rating-container">
            <span>★</span>
            <span>{{ item.product_star_rating }}</span>
            <span>({{ item.product_num_ratings }} 評價)</span>
          </div>

          <p v-if="item.product_availability">
            <span class="availability-tag">{{ item.product_availability }}</span>
          </p>

          <p v-if="item.sales_volume" class="sales-volume">
            {{ item.sales_volume }}
          </p>

          <a :href="item.product_url" target="_blank">立即購買</a>
        </div>
      </div>
    </OwlCarousel>

    <div v-if="errorMessage" class="error-card">
      <v-alert type="error" dense outlined>
        {{ errorMessage }}
      </v-alert>
    </div>
    <div v-else-if="items.length === 0" class="error-card">
      <v-alert type="info" dense outlined>載入中...</v-alert>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import OwlCarousel from 'vue-owl-carousel';
import axios from 'axios';

import AmazonSearchBar from '@/components/AmazonSearchBar.vue';
import { searchProducts } from '@/services/amazonApi';
import { product, SearchParams } from '@/types/amazon';

export default Vue.extend({
  name: 'AmazonCarousel',
  components: {
    OwlCarousel,
    AmazonSearchBar,
  },
  data() {
    return {
      items: [] as product[],
      errorMessage: '',
      carouselOptions: {
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
          0: { items: 1 }, // 螢幕寬度 0-767px 顯示1張
          768: { items: 2 }, // 螢幕寬度 768-1199px 顯示2張
          1200: { items: 3 }, // 螢幕寬度 1200px以上 顯示3張
        },
      },
    };
  },
  async mounted() {
    await this.handleSearch({
      asin: ['B08PPDJWC8', 'B07ZPKBL9V', 'B08BHXG144', 'B08PPDJWC8', 'B07ZPKBL9V', 'B08BHXG144'],
      country: 'US',
      more_info_query: '',
      fields: '',
    });
  },
  methods: {
    async handleSearch(searchParams: SearchParams) {
      this.errorMessage = '';
      try {
        const products = await searchProducts(searchParams);
        if (!Array.isArray(products)) {
          throw new TypeError('Expected an array of products');
        }
        this.items = products.map(product => ({
          product_title: product.product_title,
          product_price: product.product_price,
          product_original_price: product.product_original_price,
          product_star_rating: product.product_star_rating,
          product_num_ratings: product.product_num_ratings,
          product_url: product.product_url,
          product_photo: product.product_photo,
          product_description: product.product_description,
          product_availability: product.product_availability,
          sales_volume: product.sales_volume,
        }));
      } catch (error) {
        console.error('Error in handleSearch:', error);
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 429) {
            this.errorMessage = '當月 API 已達上限次數';
          } else {
            this.errorMessage = '發生錯誤，請稍後再試';
          }
        } else {
          this.errorMessage = '發生錯誤，請稍後再試';
        }
      }
    },
  },
});
</script>

<style scoped>
.item {
  background: linear-gradient(145deg, #3185e6a2, #f0f0f0);
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  margin: 15px;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.item h3 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin: 10px 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.company-logo {
  width: 180px;
  height: 180px;
  object-fit: contain;
  margin: 0 auto 15px;
  padding: 10px;
  background: white;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.company-logo:hover {
  transform: scale(1.05);
}

.item p {
  margin: 8px 0;
  color: #34495e;
  font-size: 0.95rem;
}

.item a {
  display: inline-block;
  padding: 10px 25px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 25px;
  margin-top: 15px;
  transition: background 0.3s ease;
}

.item a:hover {
  background: #2980b9;
}

.original-price {
  text-decoration: line-through;
  color: #95a5a6;
  margin-left: 8px;
  font-size: 0.9rem;
}

.error-card {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

/* 價格樣式 */
.price-container {
  padding: 10px;
  border-radius: 8px;
  margin: 10px 0;
}

/* 評分樣式 */
.rating-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  color: #f39c12;
}

/* 商品狀態標籤 */
.availability-tag {
  width: 15rem;
  padding: 5px 10px;
  background: #e74c3c;
  color: white;
  border-radius: 15px;
  font-size: 0.8rem;
}
</style>
