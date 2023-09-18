<template>
  <div class="notes-list">
    <div 
      v-for="note in notes"
      :key="note.id" 
      class="note__item"
    >
      <Note 
        :note="note"
        :class="{'selected': noteStore?.selectedNote?.id === note.id}"
        @click="onSelectNote(note)"
      ></Note>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotesStore } from '~/stores/notes'
const noteStore = useNotesStore()

// TODO import Note interface from types folder
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

<style>
.note__item {
  padding: 5px 0;
}

.note__item  + .note__item  {
  border-top: 1px solid #c2c2c2;
}

</style>
