<template>
  <div class="sidebar">
    
    <div class="sidebar__panel">
      <span @click="onAddNote" class="cursor-pointer">
        <font-awesome-icon icon="plus" class="gray-icon"/>
      </span>
      <span class="cursor-pointer">
        <font-awesome-icon icon="trash" class="gray-icon"/>
      </span>
    </div>

    <NotesList :notes="notesList"></NotesList>
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

    let notesList: Ref<Note[]> = ref([])
    notesList.value = await noteStore.getAll()

    const onAddNote = () => {
      const lastNote = notesList.value[notesList.value.length - 1]
      const id =  lastNote && lastNote.id ? lastNote.id + 1 : 1
      noteStore.createNote({
        id,
        ...newNote
      })
    }

    noteStore.$subscribe((mutation, state) => {
      notesList.value = [...state.notes]
    })

    return {
      notesList,
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