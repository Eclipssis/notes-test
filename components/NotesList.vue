<template>
  <div>
    <!-- <Note v-for="note in notes" :note="note"></Note> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, defineProps } from 'vue'
import { Note } from '~/stores/notes'

interface Props {
  notes: Note[],
  lol: String,
}

export default defineComponent({

  props: {
    notes: {
      type: Array,
      default: [],
    },
  },

  setup (props) {
    console.log('props', props.notes)

    return {}
  }
})
</script>

<style scoped>

</style>