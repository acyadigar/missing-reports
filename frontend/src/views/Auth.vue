<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data(){
    return{
      errors : [],
      user: {},
      isSaving: false,
      registering: true,
      error: false
    }
  },
  computed:{
  },
  methods:{
    ...mapActions(['register', 'login']),
    async sendForm(){
      this.isSaving = true
      if (this.registering){
      await this.register(this.user)
      } else {
        await this.login(this.user)
      }
      this.$router.push('/missings')
      this.isSaving = false
    },
    handleForms(){
      this.registering = !this.registering
    },
    checkForm(){
      this.errors = []
      if (!this.user.username){
        this.errors.push('Username not valid!')
        this.error = true
      }
      if (!this.user.password || this.user.password.length < 6){
        this.error = true
        this.errors.push('Password not valid!')
      }
      if (!this.errors.length) {
        this.error = false
        this.sendForm()
      }
    }
  }
}
</script>

<template lang='pug'>
  .main
    .banner
      .ban-info
        h1 petbook
        p Get your account and start sharing informations to get back your pet as quick as possible.
    .loginForm(:class='{error: error}')
      input(type='text' placeholder='username' v-model='user.username')
      input(type='password' placeholder='password' v-model='user.password')
      button(v-if='registering' :disabled='isSaving' @click='checkForm') Register
      button(v-else :disabled='isSaving' @click='checkForm') Login
      a(@click='handleForms') Register / Login
      .errors(v-if='errors.length')
        ul
          li(v-for='error in errors') {{error}}


</template>

<style scoped>
.errors{
  text-align: center;
  color: red;
  font-weight: bold;
}
.errors ul{
  list-style-type: none;
  padding: 0;
}
.main{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 7rem 10rem;
}
.loginForm{
  text-align: center;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 10px rgba(204, 204, 204, 0.712);
  padding: 2rem;
  width: 20rem;
  margin: 0 10px;
  position: relative;
}
input{
  padding: 7px;
  border: 1px solid rgba(131, 131, 131, 0.822);
  font-size: 16px;
  margin: 1rem;
}
input:focus{
  box-shadow: 0 0 8px rgb(35, 103, 167);
  outline: 0;
}
button{
  margin: 0.5rem auto;
  width: 50%;
  padding: 10px;
  color: white;
  background-color: #6db4c2;
  border: 0;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  letter-spacing: 1px;
  cursor: pointer;
  outline: border;
}
button:hover{
  opacity: 0.8;
}
a{
  text-decoration: none;
  color: #2b3338;
  margin: 1rem 0 0 0 ;
  cursor: pointer;
  user-select: none;
  font-weight: bold;
}
.error{
  box-shadow: 0 0 10px red;
}
.banner{
  text-align: center;
  width: 40%;
  margin: 10px;
  height: 20rem;
}
.ban-info h1{
  font-size: 40px;
}
.ban-info p{
  font-size: 26px;
}
@media (max-width: 750px){
  .main{
  padding: 3rem 2rem;
  display: block;
}
  .loginForm{
    margin: auto;
  }
  .banner{
    margin: auto;
  }
  .banner{
    width: 100%;
  }
}
</style>