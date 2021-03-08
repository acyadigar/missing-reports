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
.wrap{
  width: 720px;
  display: inline-block;
  white-space: pre-line;
  word-wrap: break-word;
}
.wrap p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  word-break: break-all;
  width: 720px;
}
</style>