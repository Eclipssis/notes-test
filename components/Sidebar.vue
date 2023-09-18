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

    <NotesList :notes="noteStore.filteredNotes" class="sidebar__desktop-notes"></NotesList>
    <!-- TODO: may be better to use js checking for the render notes. To not duplicate notes list twice -->
    <select class="sidebar__mobile-notes" @change="onChangeNote">
      <option v-for="note in mobileNotesList" :key="note.id" :value="note.id">
        {{ note.title.slice(0, maxNoteTitleLength) }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Note } from '~/stores/notes'
import { useNotesStore } from '~/stores/notes'
import { maxNoteTitleLength } from "~/assets/js/constants"

const newNote: Note = {
  title: 'New Note',
  body: 'No additional text',
  rawText: '# New Note',
  createdAt: new Date(), // TODO check is correct time
}

export default defineComponent({
  async setup () {
    
    const noteStore = useNotesStore()

    await noteStore.getAll()

    const onAddNote = (): void => {
      const lastNote = noteStore.notes[noteStore.notes.length - 1]
      const id =  lastNote && lastNote.id ? lastNote.id + 1 : 1
      noteStore.createNote({
        id,
        ...newNote
      })
    }

    const onDeleteNote = (): void => {
      const confirm = window.confirm('Are you sure to delete this note ?')
      if (confirm) {
        noteStore.deleteNote()
      }
    }

    const onChangeNote = (event: Event): void => {
      const target = event.target as HTMLTextAreaElement
      const selectedNote = noteStore.filteredNotes.find(note => note.id === +target.value)
      if (selectedNote) {
        noteStore.selectNote(selectedNote)
      }
    }

    const mobileNotesList = computed(() => {
      const emptyOption = {
        id: 'empty-note',
        title: 'Select note'
      }
      return [emptyOption, ...noteStore.filteredNotes]
    })

    return {
      mobileNotesList,
      noteStore,
      onAddNote,
      onDeleteNote,
      onChangeNote,
      maxNoteTitleLength
    }
  }
})
</script>

<style scoped>
.sidebar {
  width: 100%;
  min-width: 200px;
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

.not-allowed {
  opacity: 0.5;
  pointer-events: none;
}

.sidebar__desktop-notes {
  display: none;
}

.sidebar__mobile-notes {
  width: 100%;
  height: 30px;
}

@media screen and (min-width: 769px) {
  .sidebar {
    max-width: 300px;
  }
  .sidebar__mobile-notes {
    display: none;
  }

  .sidebar__desktop-notes {
    display: block;
  }
}
</style>