<template>
  <h1>Witaj!</h1>
  <div class="container">
    <form>
      <label for="email">E-mail</label>
       <br />
      <input id="email" type="text" />
      <br /><br />
      <label for="password">Hasło</label>
      <br />
      <input id="password" type="text" />
      <br /><br />

      <button @click="login">Zaloguj się</button>
    </form>
  </div>
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

<style>
body {
}
.container {
  border: 1px solid #ddd;
  background-color: darkgrey;
  width: 300px;
  padding: 50px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 85px;
  border-radius: 5px;
  background-color: #fefefe;
}
    .container input {
        width: 285px;
        background-color: #efefef;
        color: #666;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 20px;
        padding: 10px;
        position: relative;


    }
.container label {
  font-size: 15px;
  position: relative;
  float: left;
  margin-bottom: 7px;
}
    .container button {
        width: 300px;
        color: white;
        background-color: #5a28aa;
        border: 0;
        border-radius: 5px;
        font-size: 17px;
        padding: 10px;
        display: block;
        box-shadow: inset 0 0 0 #000;
        position: relative;
        cursor: pointer;
        margin-top: 30px;
    }
</style>