<script>
import { mapState } from 'vuex'
import Nav from './components/Nav'

export default {
  computed:{
    ...mapState(['user'])
  },
  components:{
    Nav
  }
  
}

</script>


<template lang="pug">
  #app
    .main
      Nav(:user='user')
      router-view
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
