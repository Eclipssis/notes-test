<template>
  <div class="sidebar">
    
    <div class="sidebar__panel">
      <span @click="onAddNote">
        <font-awesome-icon icon="plus" class="gray-icon"/>
      </span>
      <font-awesome-icon icon="trash" class="gray-icon"/>
    </div>

    <NotesList :notes="notes"></NotesList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Note } from '~/stores/notes'
import { useNotesStore } from '~/stores/notes'

const newNote: Note = {
  title: 'New Note',
  body: 'No additional text',
  createdAt: new Date(), // TODO check is correct time
}

export default defineComponent({
  async setup () {
    const noteStore = useNotesStore()

    const notes = await noteStore.getAll()

    const onAddNote = () => {
      noteStore.createNote(newNote)
    }

    return {
      notes,
      onAddNote
    }
  }
})
</script>

<style scoped>
.sidebar {
  min-width: 300px;
  border-right: 1px solid #c2c2c2;
  padding: 15px
}

.sidebar__panel {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.gray-icon {
  color: #636363;
}
</style>