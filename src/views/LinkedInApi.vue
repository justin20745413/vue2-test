<template>
  <div>
    <h2>LinkedIn 資料輪播</h2>

    <LinkedInSearchBar @search="handleSearch" />

    <OwlCarousel v-if="items.length > 0" :options="carouselOptions">
      <div v-for="(item, index) in items" :key="index" class="item">
        <img v-if="item.companyLogo" :src="item.companyLogo" alt="公司 Logo" class="company-logo" />
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <p>
          <strong>{{ item.companyName }}</strong>
        </p>
        <a :href="item.link" target="_blank">查看詳情</a>
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
import LinkedInSearchBar from '@/components/LinkedInSearchBar.vue';
import { searchJobs } from '@/services/linkedinApi';
import { LinkedInItem } from '@/types/linkedin';

export default Vue.extend({
  name: 'LinkedInCarousel',
  components: {
    OwlCarousel,
    LinkedInSearchBar,
  },
  data() {
    return {
      items: [] as LinkedInItem[],
      errorMessage: '',
      carouselOptions: {
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
          0: { items: 1 },
          600: { items: 2 },
          1000: { items: 3 },
        },
      },
    };
  },
  async mounted() {
    await this.handleSearch({
      keywords: '',
      locationId: '92000000',
      datePosted: 'anyTime',
      sort: 'mostRelevant',
    });
  },
  methods: {
    async handleSearch(searchParams: any) {
      this.errorMessage = '';
      try {
        this.items = await searchJobs(searchParams);
      } catch (error) {
        console.error('error', error);
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
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}
.item h3 {
  color: #333;
}
.company-logo {
  width: 100px;
  height: 100px;
  object-fit: contain;
  margin-bottom: 10px;
}
.error-card {
  display: flex;
  justify-content: center;
  color: red;
  font-size: 16px;
  font-weight: bold;
}
</style>
