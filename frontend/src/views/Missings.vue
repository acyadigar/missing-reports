<script>
import { mapActions, mapState } from 'vuex'
import ReportCard from '../components/ReportCard'
import LoadingCard from '../components/Loading'
import Cities from '../components/cities'

export default {
  name: 'MissingReports',
  components:{
    ReportCard,
    LoadingCard,
    Cities
  },
  data(){
    return {
      filteredReps: [],
      isRepsLoading: false
    }
  },
  computed:{
    ...mapState(['reports']),
    reportLen(){
      return this.reports.length
    },
    lastReports(){
      return this.reports.reverse()
    },
    filteredRepsLen(){
      return this.filteredReps.length
    }
  },
  methods:{
    ...mapActions(['fetchReports']),
    filtered(city){
      this.filteredReps = this.reports.filter(report => report.location == city)
    }
  },
  created(){
    this.isRepsLoading = true
    this.fetchReports().then(() => {
      this.isRepsLoading = false
    })
  },

}
</script>


<template lang="pug">
  .main
    LoadingCard(v-if='isRepsLoading')
    Cities(v-show='!isRepsLoading' v-on:filtered-reps="filtered($event)")
    .header
      .section
        h2(v-if='!filteredReps.length') Hey there, there are {{reportLen}} reported missing pets here!
        h2(v-else) Hey there, there are {{filteredRepsLen}} reported missing pets here!
    .missings
      ReportCard.card(v-if='!filteredReps.length' 
      v-for='report in lastReports' 
      :report='report')

      ReportCard.card(v-for='report in filteredReps' 
      :report='report')
</template>

<style scoped>
.section{
  text-align: center;
}
.card{
  margin: 0.5rem auto;
}
</style>