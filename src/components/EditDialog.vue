<template lang="pug">
v-dialog(v-model="dialog" v-bind="{ persistent: toEdit.title === '' }" max-width="500px")
  v-card
    v-toolbar
      v-btn(flat icon)
        v-icon close
      v-text-field(slot="extension" required v-model="toEdit.title")
      v-spacer
      v-menu(bottom offset-y)
        v-btn(slot="activator" flat icon)
          v-icon more_vert
        v-list
          v-list-tile(@click="deleteCard")
            v-list-tile-title Delete

    v-card-text
      v-text-field(v-model="toEdit.description" label="Description")
      div {{ formatDate(toEdit.created) }}에 생성됨
</template>

<script>
export default {
  computed: {
    dialog: {
      get () {
        return this.$store.state.dialog
      },
      set (v) {
        this.$store.dispatch('setDialog', v)
      }
    },
    toEdit () {
      return this.$store.state.toEdit
    }
  },
  methods: {
    deleteCard () {
      this.$store.dispatch('deleteCard')
    },
    formatDate (date) {
      if (!date) return
      date = new Date(date)
      const day = date.getDate()
      const month = date.getMonth() + 1
      const h = date.getHours()
      const m = date.getMinutes()

      return `${month}월 ${day}일 ${h}시 ${m}분`
    }
  }
}
</script>

<style scoped>

</style>
