<template>
  <v-card class="search-options">
    <label for="keywords">關鍵字:</label>
    <v-text-field
      type="text"
      id="keywords"
      v-model="searchParams.keywords"
      placeholder="輸入關鍵字"
    />

    <label for="location">地點:</label>
    <v-select
      v-model="searchParams.locationId"
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
    <v-select v-model="searchParams.datePosted" :items="['anyTime', 'pastWeek', 'pastMonth']" />

    <label for="sort">排序:</label>
    <v-select v-model="searchParams.sort" :items="['mostRelevant', 'datePosted']" />

    <v-btn prepend-icon="mdi-magnify" stacked @click="onSearch" color="info"> 搜尋 </v-btn>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { locationMap } from '@/types/linkedin';

export default Vue.extend({
  name: 'LinkedInSearchBar',
  data() {
    return {
      locationMap,
      searchParams: {
        keywords: '',
        locationId: '92000000',
        datePosted: 'anyTime',
        sort: 'mostRelevant',
      },
    };
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchParams);
    },
  },
});
</script>

<style scoped>
.search-options {
  display: flex;
  margin: 20px;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
