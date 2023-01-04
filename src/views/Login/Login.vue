<template>
  <h1>Witaj!</h1>
  <div class="container">
      <form>
          <label for="email">E-mail</label>
          <br /><br />
          <input id="email" type="text" />
          <br /><br />
          <label for="password">Hasło</label>
          <br /><br />
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
    body{
        overflow:hidden;
    }
    .container {
        border: 2px solid #ddd;
        border-radius:5px;
        background-color: #c7e9f0;
        width: 300px;
        padding: 50px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 50px;
    }
    input{
        width: 300px;
        background-color: #efefef;
        color: #666;
        border: 2px solid #ddd;
        border-radius: 5px;
        font-size: 20px;
        padding: 10px;
        position: center;
        
    }
    label {
        position: absolute;
        font-size: 15px;
        text-indent: -250px;
        
    }
    button{
        width: 315px;
        color: white;
        background-color: cornflowerblue;
        border: 2px solid #808080;
        border-radius: 5px;
        font-size: 20px;
        font-weight: 600;
        padding: 15px;
        margin: 40px;
        position:center;
    }
</style>