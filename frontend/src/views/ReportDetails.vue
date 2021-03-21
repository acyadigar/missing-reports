<script>
import { mapActions, mapState } from 'vuex'
import Edit from '../components/Edit'
export default {
  components: {
    Edit
  },
  data(){
    return{
      report: {},
      error: '',
      isEditing: false
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
    },
    toggleEdit(){
      this.isEditing = !this.isEditing
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
  .edit
    Edit(:report='report' :isEditing='isEditing')
  .report
    .err(v-if='error') 
      h1 {{error}}
    .reportImg(v-if='report.info')
      img(:src='imgUrl' alt='cat-missing') 
      p Owner is 
        router-link(:to='authorUrl') {{report.author}}
      .delete-edit(v-if='user.username == report.author')
        button(@click='handleDelete') Delete
        button(@click='toggleEdit') Edit
    .reportContent
      h2 {{report.location}}
      p {{report.info}}
</template>
  
<style scoped>
.edit{
  display: flex;
  justify-content: center;
}
img{
  border-right: 5px solid crimson;
  padding-right: 1rem;
  width: 400px;
  height: 350px;
}
.report{
  padding: 3rem;
  display: flex;
}
.reportContent{
  text-align: left;
  margin: 0 1rem;
  white-space: pre-wrap;
  width: 60%;
}
.delete-edit{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.delete-edit button{
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
.delete-edit button:nth-child(2){
  background-color: rgb(230, 230, 52);
  font-weight: 800;
  color: black;
}
.delete-edit button:nth-child(2):hover{
  background-color: rgb(224, 224, 0);
}
.delete-edit button:hover{
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