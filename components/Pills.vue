<script lang="ts" setup></script>

<template>
  <div class="container mx-auto mt-2">
    <ul class="flex flex-wrap">
      <li class="flex-1 mr-2">
        <NuxtLink to="pitchers">
          <a
            class="text-center block border border-gray-900 rounded py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white"
            href="#"
            >Pitchers</a
          >
        </NuxtLink>
      </li>
      <li class="text-center flex-1 mr-2">
        <NuxtLink to="posts">
          <a
            class="text-center block border border-gray-900 rounded py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white"
            href="#"
            >Posts</a
          >
        </NuxtLink>
      </li>
      <li class="flex-1 mr-2">
        <NuxtLink to="login">
          <a
            class="text-center block border border-gray-900 rounded py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white"
            href="#"
            >Login</a
          >
        </NuxtLink>
      </li>
    </ul>
    <div class="page"><slot /></div>
  </div>
</template>
