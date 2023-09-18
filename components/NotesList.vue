<template>
  <div class="notes-list">
    <Note 
      v-for="note in notes"
      :key="note.id"
      :note="note"
      :class="{'selected': noteStore?.selectedNote?.id === note.id}"
      @click="onSelectNote(note)"
    ></Note>
  </div>
</template>

<script setup lang="ts">
import { useNotesStore } from '~/stores/notes'
const noteStore = useNotesStore()

// TODO сделать import Note
interface Note {
  id?: number,
  title: string,
  rawText: string,
  body: string,
  createdAt: Date,
}

interface Props {
  notes: Note[]
}

const props = defineProps<Props>()
const notesList = computed(() => {
  return props.notes
})

const onSelectNote = (note: Note) => {
  noteStore.selectNote(note)
}
</script>
