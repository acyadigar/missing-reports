<script>
import { mapActions } from 'vuex'
export default {
  props: ['user'],
  name: 'Navbar',
  methods:{
    ...mapActions(['logout'])
  }
}
</script>

<template lang="pug">
  #nav
      ul
        li(v-if='!user.username')
          router-link(to='/') Home
        li 
          router-link(to='/missings') Missing Reports
        li
          router-link(to='/report') Report
        li
          router-link(to='/about') About
        .div(v-if='user.username')
            span.navUser {{user.username}}
            .logout
              p(@click='logout') logout
</template>

<style>
.div{
  position: relative;
  display: inline-block;
}
.logout{
  display: none;
  position: absolute;
  background-color: rgb(212, 218, 131);
  min-width: 70px;
  padding: 22px 0 0 0;
  text-align: center;
  z-index: 1;
  color: #0c53bd;
  font-weight: bold;
  cursor: pointer;
}
.div:hover .logout{
  display: block;
}
#nav{
  background-color: #f3a4a4;
}
#nav ul {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  margin: 0;
  list-style-type: none;
}
#nav a {
  font-weight: bold;
  color: #00579e;
  text-shadow: 0 0 2px rgb(255, 255, 255);
}
#nav a:hover{
  color: white;
  text-shadow: none;

}
.navUser{
  font-weight: bold;
  color: #0c53bd;
  cursor: pointer ;
}
</style>