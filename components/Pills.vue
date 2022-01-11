<script lang="ts" setup></script>

<template>
  <div class="container mx-auto mt-2">
    <ul class="flex flex-wrap">
      <li class="flex-1 mr-2">
        <NuxtLink to="/">
          <a
            class="text-center block border border-gray-700 rounded py-2 px-4 bg-gray-700 hover:bg-gray-900 text-white"
            href="#"
            >Newsletter</a
          >
        </NuxtLink>
      </li>
      <li class="text-center flex-1">
        <a class="block py-2 px-4 text-gray-400 cursor-not-allowed" href="#"
          >Stories</a
        >
      </li>
      <li class="flex-1 mr-2">
        <NuxtLink to="/pitchers">
          <a
            class="cursor-not-allowed text-center block border border-gray-700 rounded py-2 px-4 bg-gray-700 hover:bg-gray-900 text-white"
            href="#"
            >Pitchers</a
          >
        </NuxtLink>
      </li>
    </ul>
    <div class="page"><slot /></div>
  </div>
</template>
