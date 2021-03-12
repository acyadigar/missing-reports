<script>
export default {
  name: 'ReportCard',
  props: ['report']
}
</script>

<template lang="pug">
  .card
    img(:src='report.url' alt='missing-pet')
    .report-content
      h4 {{report.location}}
      .wrap
        p {{report.info}}
</template>

<style scoped>
h4{
  padding: 8px 0 0 0;
  margin: 0;
}
  .card{
    display: flex;
    border: 1px solid;
    width: 66%;
    height: 150px;
}
  img{
    width: 150px;
    height: 150px;
}
  .report-content{
    margin: 0 5px 0 1rem;
    padding: 0;
}
.wrap p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  word-break: break-all;
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