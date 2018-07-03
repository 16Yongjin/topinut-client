<template lang="pug">
v-app
  v-toolbar(app :clipped-left="clipped")
    v-toolbar-title(v-text="title")
  v-content
    lists
  edit-dialog

</template>

<script>
import Lists from './components/Lists'
import EditDialog from './components/EditDialog'

export default {
  name: 'App',
  components: {
    Lists,
    EditDialog
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      right: true,
      rightDrawer: false,
      title: 'Topinut'
    }
  }
}
</script>

<style>

</style>
