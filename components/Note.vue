<template>
  <div class="note">
    <h3>{{ note.title }}</h3>
    <div class="note__body">
      <span class="note__time">{{ formatedTime }}</span>
      <span class="note__body">{{ note.body }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Note } from '~/stores/notes'

interface Props {
  note: Note
}

const props = defineProps<Props>()

const formatedTime = computed(() => {
  return `${props.note.createdAt.getHours()}:${props.note.createdAt.getMinutes()}`
})
</script>

<style scoped>

.note {
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
}

.note.selected {
  background: #d7d551;
  border-radius: 6px;
}

.note + .note {
  border-top: 1px solid #c2c2c2;
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