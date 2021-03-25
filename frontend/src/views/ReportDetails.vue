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
      isEditing: false,
      contactPopup: false
    }
  },
  computed:{
    ...mapState(['user']),
    imgUrl(){
      return this.report.url
    }
  },
  methods:{
    ...mapActions(['fetchReport', 'deleteReport', 'updateReport']),
    async handleDelete(){
      await this.deleteReport(this.report._id)
      .catch(() => this.error = 'An error occured while deleting!')
      this.$router.push('/missings')
    },
    toggleEdit(){
      this.isEditing = !this.isEditing
    },
    togglePopup(){
      this.contactPopup = !this.contactPopup
    },
    editReport(){
      this.updateReport(this.report)
      this.isEditing = false
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
    Edit(:report='report' :isEditing='isEditing' @edit-info='editReport')
  .report
    .err(v-if='error') 
      h1 {{error}}
    .reportSideBar(v-if='report.info')
      img(:src='imgUrl' alt='cat-missing') 
      p Owner is 
        button.btnPopup(@click='togglePopup') {{report.author.username}}
        .userpop(v-if='contactPopup')
          p {{report.author.username}}'s contact infos:
          ul
            li Email: {{report.author.email}}
      .delete-edit(v-if='user.username == report.author.username')
        button(@click='handleDelete') Delete
        button(@click='toggleEdit') Edit
    .reportContent
      h2 {{report.location}}
      p {{report.info}}
</template>
  
<style scoped>
.btnPopup{
  background-color: transparent;
  border: none;
  font-size: 16px;
  color: crimson;
  cursor: pointer;
}
.btnPopup:focus{
  outline: 0;
}
.btnPopup:hover{
  text-decoration: underline;
}
.userpop ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.userpop p{
  margin-top: .3rem;
}
.userpop{
  border: 1px solid;
  background-color: white;
  position: absolute;
  z-index: 9998;
  padding: 0 1rem .2rem 1rem;
}
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
@media ( max-width: 800px){
  img{
    width: 300px;
    height: 300px;
    border: none;
    padding: 0;
    border-bottom: 5px solid crimson;
    padding-bottom: 1rem;
  }
  .report{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .reportContent{
    width: 75%;
    word-break: keep-all;
  }
  .reportContent h2 {
    text-align: center;
  }
}

@media (min-width: 1900px){
  .reportContent{
    width: 50%;
  }
}
</style>