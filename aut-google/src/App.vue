<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="100">
    
    <div v-if="!datosUsuario">
      <h1>Bienvenido</h1>
      <p>Inicia sesión con el cuadro de Google que aparecerá arriba a la derecha.</p>
    </div>

    <div v-else class="perfil">
      <h2>Hola, {{ datosUsuario.name }}</h2>
      <img :src="datosUsuario.picture" alt="Foto" style="border-radius: 50%; width: 100px;">
      <p><strong>Email:</strong> {{ datosUsuario.email }}</p>
      <hr>
      <p style="font-size: 10px; word-break: break-all;"><strong>Token JWT:</strong> {{ tokenJWT }}</p>
    </div>
  </div>
</template>

<script>
import googleOneTap from 'google-one-tap';
import jwt_decode from "jwt-decode";

export default {
  name: 'App',
  data() {
    return {
      tokenJWT: null,
      datosUsuario: null
    }
  },
  mounted() {
    const options = {
      client_id: '377587176686-ibi26b6tgsetc9fp839uuvcl0io8omm9.apps.googleusercontent.com', 
      auto_select: false,
      cancel_on_tap_outside: false,
    };

    googleOneTap(options, (response) => {
      this.tokenJWT = response.credential;
      
      this.datosUsuario = jwt_decode(response.credential);
      
      console.log("Acceso concedido para:", this.datosUsuario.name);
    });
  }
}
</script>

<style>
#app { font-family: Avenir, Helvetica, Arial, sans-serif; text-align: center; color: #2c3e50; margin-top: 60px; }
.perfil { border: 1px solid #ddd; padding: 20px; display: inline-block; border-radius: 10px; background: #f9f9f9; }
</style>