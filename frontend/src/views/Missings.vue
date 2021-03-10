<script>
import { mapActions, mapState } from 'vuex'
import ReportCard from '../components/ReportCard'
import LoadingCard from '../components/Loading'

export default {
  name: 'MissingReports',
  components:{
    ReportCard,
    LoadingCard
  },
  computed:{
    ...mapState(['reports']),
    reportLen(){
      return this.reports.length
    },
    lastReports(){
      return this.reports.reverse()
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
      LoadingCard(v-if='!reports.length')
        h2(v-if='reportLen > 0') Hey there, there are {{reportLen}} reported missing pets here!
    .missings
      ReportCard.card(v-for='report in lastReports' :report='report')
</template>

<style scoped>
.card{
  margin: 0.5rem auto;
}
.card:hover{
  box-shadow: 0 0 5px grey;
}
.section{
  text-align: center;
}
</style>