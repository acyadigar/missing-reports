<script>
import { mapActions } from 'vuex'
export default {
  name: 'CityOptions',
  data(){return{
    option: '',
    locations: ''
  }},
  methods:{
    ...mapActions(['fetchOptions']),
  },
  created(){
    this.fetchOptions().then((res) => {
      this.locations = res
    })
    .catch(() => {
      this.locations = 'Not available'
    })
  }
}
</script>

<template lang="pug">
.form
  .form-section
    h2 Select a City
    select(v-model='option')
      option(disabled selected value='') Locations...
      option All
      option(v-for='location in locations') {{location}}
    button(@click="$emit('filtered-reps', option)") Search
</template>

<style scoped>
option[disabled]{
  display: none;
}
.form-section{
  position: relative;
  text-align: center;
  background: rgb(255,255,255);
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%,
  rgba(233,233,233,1) 50%,
  rgba(243,164,164,1) 100%);  
  padding: 2rem;
}
h2{
  margin: 0;
  padding: 1rem;
  padding-bottom: 2rem;
}
select, button{
  margin: 0 1rem;
}
select:focus, button:focus{
  outline: none;
}
select{
  width: 10rem;
  padding: 7px;
  width: 50%;
}
select option{
  height: 2rem;
}
button{
  background-color: #f3a4a4;
  color: white;
  font-weight: bold;
  border: 0;
  padding: 9px 14px;
  border-radius: 4px;
}
button:hover{
  opacity: .8;
  cursor: pointer;
}
</style>