<script>
export default{}
</script>

<template>
<div class="main">
<div class="lds-dual-ring"></div>
</div>
</template>

<style scoped>
.main{
  padding-top: 4rem;
  text-align: center;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgb(12, 105, 151);
  border-color: rgb(25, 89, 121) transparent rgb(12, 81, 116) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>