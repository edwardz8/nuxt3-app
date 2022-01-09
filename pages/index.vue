<template>
  <div class="w-full h-screen max-w-3xl mx-auto">
    <div v-for="{ id, title, content } in posts" :key="id">{{ id }} - {{ title }} - {{ content }}</div>
    <Form />
  </div>
</template>

<script lang="ts" setup>
const { data: posts } = await useAsyncData("api", () => $fetch("/api/post"));
</script>
