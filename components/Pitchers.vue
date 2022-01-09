<template>
  <div class="w-full h-screen max-w-3xl mx-auto">
    <div>
      <Card
        v-for="p in pitchers"
        :key="p.id"
        :name="p.name"
        :team="p.team"
        :wins="p.wins"
        :losses="p.losses"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data: pitchers } = await useAsyncData("api", () => $fetch("/api/pitchers"));
</script>
