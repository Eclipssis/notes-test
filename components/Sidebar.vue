<template>
  <div class="sidebar">
    
    <div class="sidebar__panel">
      <span @click="onAddNote" class="cursor-pointer">
        <font-awesome-icon icon="plus" class="gray-icon"/>
      </span>
      <span @click="onDeleteNote" class="cursor-pointer" :class="{'not-allowed': !noteStore.selectedNote}">
        <font-awesome-icon icon="trash" class="gray-icon"/>
      </span>
    </div>

    <NotesList :notes="noteStore.filteredNotes"></NotesList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Note } from '~/stores/notes'
import { useNotesStore } from '~/stores/notes'

const newNote: Note = {
  title: 'New Note',
  body: '',
  rawText: '# New Note',
  createdAt: new Date(), // TODO check is correct time
}

export default defineComponent({
  async setup () {
    const noteStore = useNotesStore()

    await noteStore.getAll()

    const onAddNote = () => {
      const lastNote = noteStore.notes[noteStore.notes.length - 1]
      const id =  lastNote && lastNote.id ? lastNote.id + 1 : 1
      noteStore.createNote({
        id,
        ...newNote
      })
    }

    const onDeleteNote = () => {
      const confirm = window.confirm('Are you sure to delete this note ?')
      if (confirm) {
        noteStore.deleteNote()
      }
    }

    return {
      noteStore,
      onAddNote,
      onDeleteNote
    }
  }
})
</script>

<style scoped>
.sidebar {
  min-width: 200px;
  border-right: 1px solid #c2c2c2;
  padding: 15px
}

@media screen and (min-width: 769px) {
  .sidebar {
    min-width: 300px;
  }
}

.sidebar__panel {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.gray-icon {
  color: #636363;
}

.not-allowed {
  opacity: 0.5;
  pointer-events: none;
}
</style>