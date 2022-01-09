<template>
  <div class="bg-white-300">
    <div class="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
      <div>
        <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl md:text-4xl sm:text-4xl">Features</h2>
        <p class="mt-4 text-gray-700">Prosper during the fantasy baseball season with articles on parlays, lineup and season-long fantasy advice.</p>

        <dl class="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
          <div v-for="feature in features" :key="feature.name" class="border-t border-gray-900 pt-4">
            <dt class="font-medium text-gray-900">{{ feature.name }}</dt>
            <dd class="mt-2 text-sm text-gray-700">{{ feature.description }}</dd>
          </div>
        </dl>
      </div>
      <div class="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
        <img src="/baseball_image_2.jpg" alt="baseball" class="bg-gray-100 rounded-lg" />
        <img src="/baseballs_image.jpg" alt="baseball" class="bg-gray-100 rounded-lg" />
        <img src="/baseball_field_pitcher.jpg" alt="baseball" class="bg-gray-100 rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script>
const features = [
  { name: 'Dynasty Baseball', description: 'Season-long and dynasty league baseball articles ⚾' },
  { name: 'Daily Fantasy Lineups', description: 'FanDuel and DraftKings top plays 📱' },
  { name: 'Parlays', description: 'String together high-percentage combos for 💰' },
  { name: 'Player News', description: 'Trending player updates 💻' },
]

export default {
  setup() {
    return {
      features,
    }
  },
}
</script>