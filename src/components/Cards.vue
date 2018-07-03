<template lang="pug">
v-flex(xs4)
  v-card
    v-card-title.pa-2
      div {{ title }}
    v-container.pa-2
      v-layout(column)
        draggable.dragArea(v-model="list" :options="{ group: 'card' }")
          v-flex(xs12 v-for="card in list" :key="card.id")
            v-card(@click.native="openDialog(card)")
              v-card-title.pa-2.card-text {{card.title}}

        v-flex(v-if="adding" xs12)
          v-text-field(hide-details solo v-model="addingCardTitle" @keyup.enter="addCard()")

    v-card-actions(v-if="adding")
      v-btn.hidden-xs-only(flat @click="cancel") Cancel
      v-btn.hidden-sm-and-up(flat icon @click="cancel")
        v-icon close

      v-spacer

      v-btn.hidden-xs-only(flat @click="addCard") Add
      v-btn.hidden-sm-and-up(flat @click="addCard" icon)
        v-icon add
    v-card-actions.pa-0(v-else)
      v-btn.ma-0(flat block @click="add")
        div.hidden-xs-only Add card
        v-icon.hidden-sm-and-up add
</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: ['title', 'cards'],
  data () {
    return {
      adding: false,
      addingCardTitle: ''
    }
  },
  components: {
    draggable
  },
  computed: {
    list: {
      get () {
        return this.$store.state[this.cards]
      },
      set (value) {
        this.$store.dispatch('updateCards', { cards: this.cards, value })
      }
    }
  },
  methods: {
    add () {
      this.adding = true
    },
    cancel () {
      this.addingCardTitle = ''
      this.adding = false
    },
    addCard () {
      if (!this.addingCardTitle) {
        return this.cancel()
      }
      this.$store.dispatch('addCard', { cards: this.cards, value: this.addingCardTitle })
      this.cancel()
    },
    openDialog (card) {
      this.$store.commit('openDialog', { card, cards: this.cards })
    }
  }
}
</script>

<style scoped>
.dragArea {
  min-height: 10px;
}

.card-text {
  word-break: break-all;
}
</style>
