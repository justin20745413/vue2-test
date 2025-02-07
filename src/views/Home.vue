<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-3">Welcome to Homepage</h1>
      </v-col>

      <v-col cols="12">
        <carousel :items="3" :nav="true" :autoplay="true">
          <div v-for="slide in slides" :key="slide.id" class="item">
            <v-card class="ma-2">
              <v-img :src="slide.image" height="200px"></v-img>
              <v-card-title>{{ slide.title }}</v-card-title>
              <v-card-text>{{ slide.description }}</v-card-text>
            </v-card>
          </div>
        </carousel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import carousel from 'vue-owl-carousel';

@Component({
  components: {
    carousel,
  },
})
export default class Home extends Vue {
  slides = [
    {
      id: 1,
      title: 'Slide 1',
      description: 'Description for slide 1',
      image: 'https://picsum.photos/id/1/500/300',
    },
    {
      id: 2,
      title: 'Slide 2',
      description: 'Description for slide 2',
      image: 'https://picsum.photos/id/2/500/300',
    },
    {
      id: 3,
      title: 'Slide 3',
      description: 'Description for slide 3',
      image: 'https://picsum.photos/id/3/500/300',
    },
    {
      id: 4,
      title: 'Slide 4',
      description: 'Description for slide 4',
      image: 'https://picsum.photos/id/4/500/300',
    },
    {
      id: 5,
      title: 'Slide 5',
      description: 'Description for slide 5',
      image: 'https://picsum.photos/id/5/500/300',
    },
  ];
}
</script>

<style scoped>
.item {
  height: 100%;
}
</style>
