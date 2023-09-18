<template>
  <div class="note">
    <h3>{{ note.title.slice(0, maxNoteTitleLength) }}</h3>
    <div class="note__body">
      <span class="note__time">{{ formatedTime }}</span>
      <span class="note__body">{{ note.body.slice(0, maxNoteBodyLength) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Note } from '~/stores/notes'
import { maxNoteTitleLength, maxNoteBodyLength } from "~/assets/js/constants"

interface Props {
  note: Note
}

const props = defineProps<Props>()
const { formatTime } = useDate()

const formatedTime = computed(() => {
  return formatTime(props.note.createdAt, { hours: true, minutes: true })
})
</script>

<style scoped>

.note {
  padding: 10px;
  cursor: pointer;
}

.note.selected {
  background: #fed7aa;
  border-radius: 6px;
}

.note__body {
  display: flex;
}

.note__time {
  margin-right: 5px;
  color: black;
}

.note__body {
  color: #636363;
}
</style>