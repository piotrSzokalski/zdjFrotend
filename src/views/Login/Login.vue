<template>
  <h1>Strona logowania</h1>
  <label for="email">E-mail</label>

  <input id="email" type="text" />

  <label for="password">Haslo</label>

  <input id="password" type="text" />

  <button @click="login">Zaloguj</button>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

/*
 * Ekran logowania
 */
export default defineComponent({
  setup() {
    const router = useRouter();

    /**
     * TODO
     * loguje użytkownika
     */
    function login(): void {
      router.push("gallery");
    }

    return {
      login,
    };
  },
});
</script>

<style lang="css">
</style>