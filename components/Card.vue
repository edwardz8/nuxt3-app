<template>
  <div class="max-w-sm w-full lg:max-w-full lg:flex mt-4">
    <div
      class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      :style="{ backgroundImage: `url(${image})`}"
      title="pitcher"
    ></div>
    <div
      class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
    >
      <div class="mb-8">
        <div class="text-gray-900 font-bold text-xl mb-2">
        {{ name }}
        </div>
        <p class="text-gray-700 text-sm text-base">
          {{ team }}
        </p>
      </div>
      <div class="flex items-center">
     <!--   <img
          class="w-10 h-10 rounded-full mr-4"
          :src="'/images/baseball_image_2.jpg'"
          alt=""
        /> -->
        <div class="text-sm flex flex-wrap">
          <p class="text-gray-900">Wins: {{ wins }} - Losses: {{ losses }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import image from '/images/baseballs_image.jpg'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    },
    team: {
      type: String,
      required: true,
    },
    wins: {
      type: Number,
      required: true,
    },
    losses: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const pitchers = ref([]);
    return {
        pitchers, image
    };
  },
});
</script>
