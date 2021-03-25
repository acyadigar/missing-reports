<script>
export default {
  name: 'ReportEditing',
  props:['report', 'isEditing'],
}
</script>

<template lang='pug'>
transition(name='slide-fade-v')
  .form(v-show='isEditing')
    .info
      textarea(v-model='report.info')
    button(@click="$emit('edit-info')") Edit
</template>

<style scoped>
textarea{
  resize: none;
  font-size: 20px;
  box-sizing: border-box;
  width: 80%;
  height: 50px;
  transition: all 0.4s ease;
  border: 0;
}
textarea:focus{
  outline: 0;
  box-shadow: 0 0 1rem rgb(77, 160, 216);
}
.form {
  box-sizing: border-box;
  padding: 1rem;
  width: 100%;
  background-color: #5f5f5f86;
  position: absolute;
  text-align: center;
  border-radius: 0 0 5rem 5rem;
}
.form button {
  padding: .5rem 2rem;
  background-color: rgb(255, 232, 29);
  border: 0;
  border-radius: 3px;
  margin-top: .7rem;
  font-weight: 800;
}
.form button:hover{
  background-color: rgb(245, 245, 118);
  cursor: pointer;
}
.info{
  color: white;
}
</style>