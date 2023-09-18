import { defineStore } from 'pinia'
import { useIndexStore } from '~/stores/index'

// TODO import Note interface from types folder
export interface Note {
  id?: number,
  title: string,
  body: string,
  rawText: string,
  createdAt: Date,
}

interface State {
  notes: Note[],
  selectedNote: Note | null,
  searchText: string,
}

export const useNotesStore = defineStore('notes', {
  state: (): State => ({ 
    notes: [],
    selectedNote: null,
    searchText: ''
  }),

  getters: {
    filteredNotes: (state) => {
      return state.notes.filter(note => {
        const searchTextLowwer = state.searchText.toLocaleLowerCase()

        return note.rawText.toLocaleLowerCase().includes(searchTextLowwer) || 
          note.title.toLocaleLowerCase().includes(searchTextLowwer)
      })
    },
  },

  actions: {
    setSearchText(text: string): void {
      this.searchText = text
    },

    selectNote(note: Note | null): void {
      this.selectedNote = note
    },

    getAll(): void {
      const indexStore = useIndexStore()

      if (indexStore && indexStore.db) {
        let transaction = indexStore.db.transaction("notes", "readwrite")
        let notesStore = transaction.objectStore("notes")
        const notesRequset = notesStore.getAll()

        notesRequset.onsuccess = () => {
          this.notes.push(...notesRequset.result)
        }
      }
    },

    createNote (note: Note): void {
      const indexStore = useIndexStore()
      if (indexStore && indexStore.db) {
        let transaction = indexStore.db.transaction("notes", "readwrite")
        let notesRequset = transaction.objectStore("notes").add(note)

        notesRequset.onsuccess = () => {
          this.notes.push(note)
          // TODO on mobile make sence to select new created notes (for my opinion)
          // this.selectNote(note)
        }
      }
    },

    updateNote(note: Note): void {
      const indexStore = useIndexStore()
      if (indexStore && indexStore.db) {
        let transaction = indexStore.db.transaction("notes", "readwrite")
        let notesRequset = transaction.objectStore("notes").put(note)
        notesRequset.onsuccess = () => {
          const index = this.notes.findIndex(item => item.id === note.id)
          this.notes.splice(index, 1, note)
          this.selectedNote = note
        }
      }
    },

    deleteNote() {
      const indexStore = useIndexStore()

      if (this.selectedNote && this.selectedNote.id) {
        if (indexStore && indexStore.db) {
          const notesRequset = indexStore.db.transaction('notes', 'readwrite')
            .objectStore('notes')
            .delete(this.selectedNote?.id)

          notesRequset.onsuccess = () => {
            const index = this.notes.findIndex(item => item.id === this.selectedNote?.id)
            this.notes.splice(index, 1)
            this.selectNote(null)
          }
        }
        
      }
    }
  },
})