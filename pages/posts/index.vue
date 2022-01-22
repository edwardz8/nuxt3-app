<template>
  <div class="w-full h-screen mx-auto mt-2 ml-2 mr-2">
    <div
      v-for="post in posts"
      :key="post.id"
      class="max-w-sm rounded overflow-hidden shadow-lg"
    >
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ post.title }}</div>
        <p class="text-gray-700 text-base">
          {{ post.content }}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <button
          class="inline-block hover:bg-gray-900 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold hover:text-gray-100 text-gray-700 mr-2 mb-2"
          ><nuxt-link :to="{ name: 'posts-id', params: { id: post.id } }"
            >Read
          </nuxt-link></button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData("api", () => $fetch("/api/posts"));
</script>
