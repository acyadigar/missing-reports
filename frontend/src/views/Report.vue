<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'Report',
  data(){
    return{
      errors: [],
      report:{},
      isSaving: false
    }
  },
  computed:{
    ...mapState(['user']),
  },
  methods:{
    ...mapActions(['postReport']),
    async sendForm(){
      this.isSaving = true
      await this.postReport(this.report)
      this.$router.push('/missings')
      this.isSaving = false
    },
    checkForm(){
      this.errors = []
      if(!this.user.username){
        return this.errors.push('Need to login!')
      }
      if (!this.report.url){
        this.errors.push('An image url is required!')
      }
      if (!this.report.location){
        this.errors.push('Location is required!')
      }
      if (!this.report.info || this.report.info.length < 20){
        this.errors.push('Info needs at least 20 characters!')
      }
      if (!this.errors.length) {
        this.sendForm()
      }
    },
    refillForm(){
      return this.errors = []
    }
  }
}
</script>

<template lang="pug">
  .main
    .err-container(v-if='errors.length')
      .err
        ul
          li(v-for='error in errors') {{error}}
        button(@click='refillForm') OK
    .container
      .info
        h2 Missing report form
        p More info you give, the more chance to receive info about your pet. So start filling the report form now.
      .reportForm
        h1.formHeader Missing Report
        label Image URL
        input(type='text' placeholder='An uploaded photo of your pet' v-model='report.url')
        label Location
        input(type='text' v-model='report.location')
        label Info:
        textarea(rows='8' v-model='report.info')
        button(@click='checkForm' :disabled='isSaving') Report!
</template>

<style scoped>
.err-container{
  display: flex;
  align-items: center;
  justify-content: center;
}
.err{
  position: fixed;
  top: 25%;
  background-color: rgba(255, 0, 0, 0.685);
  text-align: center;
  z-index: 1;
  color: white;
  font-weight: bold;
}
.err ul{
  list-style-type: none;
  padding: 0;
  padding: 7px 3rem;
}
.container{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0 10rem;
}
.info{
  width: 20rem;
}
.info h2{
  font-size: 40px;
}
.info p{
  font-size: 26px;
}
.reportForm{
  display: flex;
  flex-direction: column;
  margin: 3rem 0 0 0;
  width: 23rem;
  box-shadow: 0 0 3px  #333;
}
input, textarea{
  width: 20rem;
  margin: 2px auto;
  padding: 7px;
  border: 1px solid rgba(131, 131, 131, 0.822);
  font-size: 16px;
}
label{
  margin: 9px 1rem;
  font-weight: bold;
}
input:focus, textarea:focus{
  box-shadow: 0 0 8px rgb(35, 103, 167);
  outline: 0;
}
button{
  margin: 0.5rem auto;
  width: 7rem;
  padding: 10px;
  color: white;
  background-color: #c26d6d;
  border: 0;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  letter-spacing: 1px;
  cursor: pointer;
  outline: none;
}
button:hover{
  background-color: #b15c5c;
}
.formHeader{
  margin: 4px auto;
  padding-top: 2px;
  font-size: 24px;
}
@media (max-width: 900px){
  .container{
    display: block;
    text-align: center;
    padding: 0;
  }
  .info, .reportForm{
    margin: auto;
  }
}
@media (min-width: 1900px){
  .container{
    padding: 1rem 25rem;
  }
  .info{
    width: 25rem;
  }
  .reportForm{
    height: 35rem;
    padding: 2rem 2rem 2rem 3rem;
  }
  .reportForm input {
    margin: 1rem;
  }
  .reportForm h1, .reportForm button{
    margin: 1rem auto;
  }
}
</style>