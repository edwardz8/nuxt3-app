<template>
  <form @submit.prevent="postToDB" class="text-gray-600 body-font">
    <div class="container px-5 py-20 mx-auto flex flex-wrap">
      <div class="left 2xl:w-1/3 xl:w-1/3 lg:w-1/3 md:w-1/2 lg:pr-0 pr-0 mt-6">
        <h1 class="title-font font-medium text-3xl text-gray-900">
          Subscribe to newsletter ⚾ 
        </h1>
        <p class="leading-relaxed mt-4">
          Weekly fantasy baseball newsletter straight to your inbox. Only relevant content
          will be sent.
        </p>
       <!--  <img src="../assets/stadium-trees-phone.png" /> -->
      </div>
      <div
        class="lg:w-1/2 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full"
      >
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Subscribe </h2>

        <div class="relative mb-4">
          <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            name="email"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button
          class="text-white bg-gray-900 border-0 py-2 px-8 focus:outline-none hover:bg-gray-700 rounded text-lg"
        >
          Subscribe
        </button>
        <p class="text-xs text-gray-500 mt-3"></p>
      </div>
    </div>
  </form>
</template>

<script setup>
    /* const config = useRuntimeConfig()
    config.sbUrl
    config.sbKey */

    const DBResponse = ref([])

    const email = ref('')

    async function postToDB() {
        const result = await fetch(`/server/api/subscribe?email=${email.value}`)
        const data = await result.json()
        DBResponse.value = data
    }
</script>