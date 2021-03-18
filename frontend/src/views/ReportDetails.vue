<script>
import { mapActions, mapState } from 'vuex'
export default {
  data(){
    return{
      report: {},
      error: ''
    }
  },
  computed:{
    ...mapState(['user']),
    imgUrl(){
      return this.report.url
    },
    authorUrl(){
      return `/report/${this.report.author}`
    }
  },
  methods:{
    ...mapActions(['fetchReport', 'deleteReport']),
    async handleDelete(){
      await this.deleteReport(this.report._id)
      .catch(() => this.error = 'An error occured while deleting!')
      this.$router.push('/missings')
    }
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
      .delete(v-if='user.username == report.author')
        button(@click='handleDelete') Delete
    .reportContent
      h2 {{report.location}}
      p {{report.info}}
</template>
  
<style scoped>
img{
  border-right: 5px solid crimson;
  padding-right: 1rem;
  width: 400px;
  height: 350px;
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
.delete button{
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
.delete button:hover{
  background-color: #b15c5c;
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