<script>
export default {
  name: 'ReportCard',
  props: ['report'],
  computed:{
    repUrl() {
      return `/report/${this.report._id}`
    }
  }
}
</script>

<template lang="pug">
  a(:href='repUrl').card
    img(:src='report.url' alt='missing-pet')
    .report-content
      h4 {{report.location}}
      .wrap
        p {{report.info}}
</template>

<style scoped>
a{
  text-decoration: none;
}
a *{
  color: #444;
}
h4{
  color: #0c53bd;
  padding: 8px 0 0 0;
  margin: 0;
}
.card{
  display: flex;
  border: 1px solid black;
  width: 66%;
  height: 150px;
  border-radius: 20px;
}
.card:hover{
  box-shadow: 0 0 10px grey;
}
img{
    width: 150px;
    height: 150px;
    border-radius: 20px 0 0 20px;
}
.report-content{
    margin: 0 5px 0 1rem;
    padding: 0;
}
.wrap p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  word-break: break-all;
  overflow: hidden;
  width: inherit;
}
@media (max-width: 900px){
  .card{
    width: 90%;
  }
}
@media (max-width: 500px){
  img{
    height: 90px;
    width: 90px;
  }
  .card{
    height: 90px;
  }
  .wrap p {
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  word-break: break-all;
  width: inherit;
  }
}
</style>