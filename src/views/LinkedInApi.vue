<template>
  <div>
    <h2>LinkedIn 資料輪播</h2>

    <!-- 搜尋條件選項 -->
    <v-card class="search-options">
      <label for="keywords">關鍵字:</label>
      <v-text-field type="text" id="keywords" v-model="keywords" placeholder="輸入關鍵字" />

      <label for="location">地點:</label>
      <v-select
        v-model="locationId"
        :items="Object.entries(locationMap).map(([id, name]) => ({ value: id, text: name }))"
      >
        <template v-slot:selection="{ item }">
          {{ item.text }}
        </template>
        <template v-slot:item="{ item }">
          {{ item.text }}
        </template>
      </v-select>

      <label for="datePosted">發佈時間:</label>
      <v-select v-model="datePosted" :items="['anyTime', 'pastWeek', 'pastMonth']"> </v-select>

      <label for="sort">排序:</label>
      <v-select v-model="sort" :items="['mostRelevant', 'datePosted']"> </v-select>

      <v-btn prepend-icon="mdi-magnify" stacked @click="fetchLinkedInData" color="info">
        搜尋
      </v-btn>
    </v-card>
    <!-- 輪播 -->
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
import Vuetify from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';

const locationMap: Record<string, string> = {
  '92000000': '台灣',
  '90000000': '美國',
  '91000000': '日本',
  '93000000': '大陸',
  '94000000': '香港',
  '95000000': '新加坡',
  '96000000': '馬來西亞',
  '97000000': '泰國',
  '98000000': '菲律賓',
  '99000000': '印尼',
};

interface LinkedInItem {
  title: string;
  description: string;
  link: string;
  companyName: string;
  companyLogo: string;
}

// 定義每個職位的型別
interface Job {
  title: string;
  location: string;
  url: string;
  company: {
    name: string;
    logo: string;
  };
}

export default Vue.extend({
  name: 'LinkedInCarousel',
  components: {
    OwlCarousel,
  },
  vuetify: new Vuetify(),
  data() {
    return {
      items: [] as LinkedInItem[],
      keywords: '', // 初始關鍵字
      locationId: '92000000',
      locationMap,
      datePosted: 'anyTime', // 預設發佈時間
      sort: 'mostRelevant', // 預設排序
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
    await this.fetchLinkedInData();
  },
  methods: {
    async fetchLinkedInData() {
      this.errorMessage = '';
      try {
        const response = await axios.get(
          `https://linkedin-api8.p.rapidapi.com/search-jobs-v2?keywords=${this.keywords}&locationId=${this.locationId}&datePosted=${this.datePosted}&sort=${this.sort}`,
          {
            headers: {
              'X-RapidAPI-Key': '267818dd83msh6bec246007921f1p1dbd15jsne102e75ef62b',
              'X-RapidAPI-Host': 'linkedin-api8.p.rapidapi.com',
            },
          }
        );

        const jobsArray = response.data.data;

        this.items = jobsArray.map((job: Job) => ({
          title: job.title || '無標題',
          description: job.location || '地點未知',
          link: job.url || '#',
          companyName: job.company?.name || '未知公司',
          companyLogo: job.company?.logo || '',
        }));

        console.log('整理後的資料:', this.items);
      } catch (error: unknown) {
        console.log('error', error);
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 429) {
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
.search-options {
  display: flex;
  margin: 20px;
  padding: 20px;
  margin-bottom: 20px;
}
.errormessage {
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
  font-size: 16px;
  font-weight: bold;
}
.error-card {
  display: flex;
  justify-content: center;
  color: red;
  font-size: 16px;
  font-weight: bold;
}
</style>
