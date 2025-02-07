<template>
  <div class="search-bar">
    <v-form @submit.prevent="handleSubmit">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field v-model="searchParams.keywords" label="關鍵字" outlined dense />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="searchParams.salary"
              :items="salaryOptions"
              label="薪資預期"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="searchParams.locationId"
              :items="locations"
              label="地區"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="searchParams.jobType"
              :items="jobTypeOptions"
              label="工作類型"
              outlined
              dense
            />
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="searchParams.datePosted"
              :items="dateOptions"
              label="發布時間"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="searchParams.sort"
              :items="sortOptions"
              label="排序方式"
              outlined
              dense
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn color="primary" type="submit">搜尋</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { SearchParams } from '@/types/linkedin';

export default Vue.extend({
  name: 'LinkedInSearchBar',
  data() {
    return {
      searchParams: {
        keywords: '',
        locationId: '92000000',
        datePosted: 'anyTime',
        sort: 'recent',
        salary: '',
        jobType: '',
      } as SearchParams,
      locations: [
        { text: '台灣', value: '92000000' },

        { text: '台北', value: '90000084' },
        { text: '台中', value: '90000085' },
        { text: '台南', value: '90000086' },

        { text: '高雄', value: '90000087' },
        { text: '桃園', value: '90000088' },
        { text: '新竹', value: '90000089' },
        { text: '苗栗', value: '90000090' },
        { text: '彰化', value: '90000091' },
        { text: '南投', value: '90000092' },
        { text: '雲林', value: '90000093' },
        { text: '嘉義', value: '90000094' },
        { text: '屏東', value: '90000095' },
        { text: '宜蘭', value: '90000096' },
        { text: '花蓮', value: '90000097' },
        { text: '台東', value: '90000098' },
        { text: '澎湖', value: '90000099' },
        { text: '金門', value: '90000100' },
        { text: '連江', value: '90000101' },
      ],
      dateOptions: [
        { text: '不限時間', value: 'anyTime' },
        { text: '過去 24 小時', value: 'past24h' },
        { text: '過去一週', value: 'past7d' },
        { text: '過去一個月', value: 'past1M' },
      ],
      sortOptions: [
        { text: '最相關', value: 'mostRelevant' },
        { text: '最新', value: 'recent' },
      ],
      salaryOptions: [
        { text: '不限薪資', value: '' },
        { text: '40k', value: '40k+' },
        { text: '60k+', value: '50k+' },
        { text: '80k+', value: '80k+' },
        { text: '100k+', value: '100k+' },
        { text: '120k+', value: '120k+' },
        { text: '140k+', value: '140k+' },
        { text: '160k+', value: '160k+' },
        { text: '180k+', value: '180k+' },
        { text: '200k+', value: '200k+' },
      ],
      jobTypeOptions: [
        { text: '不限工作類型', value: '' },
        { text: '全職', value: 'fullTime' },
        { text: '兼職', value: 'partTime' },
        { text: '合約', value: 'contract' },
        { text: '實習', value: 'internship' },
        { text: '遠端', value: 'remote' },
      ],
    };
  },

  methods: {
    handleSubmit() {
      this.$emit('search', { ...this.searchParams });
    },
  },
});
</script>

<style scoped>
.search-bar {
  margin-bottom: 20px;
}
</style>
