<script>
import { mapActions } from 'vuex'
export default {
  data(){
    return{
      report: {},
      error: ''
    }
  },
  computed:{
    imgUrl(){
      return this.report.url
    },
    authorUrl(){
      return `/report/${this.report.author}`
    }
  },
  methods:{
    ...mapActions(['fetchReport'])
  },
  created() {
    this.fetchReport(this.$route.params.id)
    .then((res) => {
      this.report = res
    })
    .catch((e) => this.error = e)
  }
}
</script>

<template lang="pug">
  .main
    .err(v-if='error') 
      h1 {{error}}
    .reportImg(v-if='report.info')
      img(:src='imgUrl' alt='cat-missing') 
      p Owner is 
        router-link(:to='authorUrl') {{report.author}}
    .reportContent
      h2 {{report.location}}
      p {{report.info}}
</template>
  
<style scoped>
img{
  border-right: 5px solid crimson;
  padding-right: 1rem;
  width: 400px;
  height: 400px;
}
.main{
  padding: 3rem;
  display: flex;
}
.reportContent{
  text-align: left;
  margin: 0 1rem;
  white-space: pre-wrap;
  width: 60%;
}
@media ( max-width: 700px){
  .main{
    display: block;
    text-align: center;
  }
  img{
    border-right: none;
    padding-right: none;
    width: 95%;
    height: 95%;
  }
  .reportContent{
    width: 95%;
    margin: 0;
  }
}
</style>