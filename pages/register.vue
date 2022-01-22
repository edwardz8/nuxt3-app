<template>
  <div class="w-full max-w-xs mt-4 ml-2 mr-2">
    <form onsubmit="return false" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="name"
          v-model="name"
          :class="{ error: signupFailed }"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="email"
          v-model="email"
          :class="{ error: signupFailed }"
        />
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          v-model="password"
          :class="{ error: signupFailed }" />
      </div>

      <div>
        <button @click="attemptSignup"
          class="bg-gray-900 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button">
          Sign Up
        </button>
        <p class="inline-block align-baseline text-sm text-blue-900 hover:text-blue-800">
          <nuxt-link :to="{ name: 'index' }"> Already a member? Login. </nuxt-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import useAuthState from "~~/composables/useAuthState";

const authState = useAuthState();
const router = useRouter();

if (authState.value.loggedIn) {
  router.push("/");
}

let name = ref("");
let email = ref("");
let password = ref("");
let signupFailed = ref(false);

function attemptSignup() {
  $fetch("/api/user/register", {
    method: "POST",
    body: {
      name: name.value,
      email: email.value,
      password: password.value,
    },
  })
    .then((response) => {
      signupFailed.value = false;
      authState.set({
        loggedIn: true,
        jwt: (response as { token: string }).token,
        user: { id: response.id, name: response.name, email: response.email },
      });
      router.push("/");
    })
    .catch((e) => {
      console.log(e);
      signupFailed.value = true;
    });
}
</script>

<style>
form input,
button {
  margin: 0.5em;
}
</style>
