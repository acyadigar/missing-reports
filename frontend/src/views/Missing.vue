<script>
import { mapActions, mapState } from 'vuex'
import ReportCard from '../components/ReportCard'

export default {
  name: 'MissingReports',
  components:{
    ReportCard
  },
  computed:{
    ...mapState(['reports']),
    reportLen(){
      return this.reports.length
    }
  },
  methods:{
    ...mapActions(['fetchReports'])
  },
  created(){
    this.fetchReports()
  }

}
</script>


<template lang="pug">
  .main
    .header
      .section
        h2(v-if='reportLen > 0') Hey there, there are {{reportLen}} reported missing pets here!
    .missings
      ReportCard.card(v-for='report in reports' :report='report')
</template>

<style scoped>
.card{
  margin: 0.5rem 0;
}
.card:hover{
  box-shadow: 0 0 5px grey;
}
.section{
  text-align: center;
}
</style>