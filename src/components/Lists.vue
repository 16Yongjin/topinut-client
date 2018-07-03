<template lang="pug">
v-container.pa-2(fluid grid-list-md)
  v-layout(row wrap)
    cards(title="To do" cards="toDo")
    cards(title="Doing" cards="doing")
    cards(title="Done" cards="done")

</template>

<script>
import Cards from './Cards'
export default {
  components: {
    Cards
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
