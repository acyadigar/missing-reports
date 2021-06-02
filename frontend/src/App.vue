<script>
import { mapActions, mapState } from 'vuex'
import Nav from './components/Nav'

export default {
  components: {
    Nav
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapActions(['otoLogin'])
  },
  created() {
    if (localStorage.getItem('token')) {
      this.otoLogin()
    }
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
@import 'styles/style.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
