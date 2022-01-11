<template>
  <div class="container">
    <form onsubmit="return false">
      <input type="text" placeholder="name" v-model="name" :class="{ error: signupFailed }" />
      <input type="text" placeholder="email" v-model="email" :class="{ error: signupFailed }" />
      <input type="text" placeholder="password" v-model="password" :class="{ error: signupFailed }" />
      <button @click="attemptSignup">Register</button>
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
