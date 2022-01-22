<script lang="ts" setup>
const route = useRoute();
const { data: post } = await useFetch(`/api/posts/${route.params.id}`);
console.log(post.value);
</script>

<template>
  <div class="w-full h-screen mx-auto mt-2 ml-4 mr-4 px-6 py-6">
    <h1 class="text-xl">
      {{ post.title }}
    </h1>
    <p class="mt-6 mb-6">
      {{ post.content }}
    </p>
    <span
      class="inline-block hover:bg-gray-900 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold hover:text-gray-100 text-gray-700 mr-2 mb-2"
      ><nuxt-link :to="{ name: 'posts' }">Articles </nuxt-link></span
    >
  </div>
</template>
