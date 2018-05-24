<template>
  <div id="app">
    <my-home v-if="user.tellerId" :user="user"></my-home>
    <my-login v-else></my-login>
  </div>
</template>

<script>
  import myHome from './pages/basic/home'
  import myLogin from './pages/basic/login'
  import {mapGetters} from 'vuex'
  export default {
    name: 'App',
    components:{
      myHome,
      myLogin
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1,h2,h3,h4,h5,ul,li{
  margin:0;
  padding: 0;
}
</style>
