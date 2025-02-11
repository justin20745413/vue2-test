<template>
  <div class="search-bar">
    <v-form @submit.prevent="handleSubmit">
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field v-model="searchParams.asin" label="ASIN" outlined dense />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="searchParams.country"
              :items="countryOptions"
              label="國家"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="searchParams.more_info_query"
              label="更多資訊查詢"
              outlined
              dense
            />
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field v-model="searchParams.fields" label="欄位" outlined dense />
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
import { SearchParams } from '@/types/amazon';

export default Vue.extend({
  name: 'AmazonSearchBar',
  data() {
    return {
      searchParams: {
        asin: ['B08PPDJWC8', 'B07ZPKBL9V', 'B08BHXG144', 'B08PPDJWC8', 'B07ZPKBL9V', 'B08BHXG144'],
        country: '',
        more_info_query: '',
        fields: '',
      } as SearchParams,
      countryOptions: [
        { text: '美國', value: 'US' },
        { text: '日本', value: 'JP' },
        { text: '大陸', value: 'CN' },
        { text: '香港', value: 'HK' },
        { text: '新加坡', value: 'SG' },
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
