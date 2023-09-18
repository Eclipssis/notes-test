import { defineStore } from 'pinia'
import { useIndexStore } from '~/stores/index'

// TODO move type to folder
export interface Note {
  id?: number,
  title: string,
  body: string,
  rawText: string,
  createdAt: Date,
}

interface State {
  notes: Note[],
  selectedNote: Note | null
}

export const useNotesStore = defineStore('notes', {
  state: (): State => ({ 
    notes: [],
    selectedNote: null,
  }),

  actions: {
    selectNote(note: Note): void {
      this.selectedNote = note
    },

    getAll(): Promise<Note[]> {
      
      const indexStore = useIndexStore()

      return new Promise((resolve, reject) => {
        if (indexStore && indexStore.db) {
          let transaction = indexStore.db.transaction("notes", "readwrite")
          let notesStore = transaction.objectStore("notes")
          const noteRecords = notesStore.getAll()

          noteRecords.onsuccess = () => {
            resolve(noteRecords.result)
            this.notes.push(...noteRecords.result)
          }

          noteRecords.onerror = function() {
            reject([])
          }
        } else {
          resolve([])
        }
      })
    },

    createNote (note: Note): void {
      const indexStore = useIndexStore()
      if (indexStore && indexStore.db) {
        let transaction = indexStore.db.transaction("notes", "readwrite")
        let notesRequset = transaction.objectStore("notes").add(note)

        notesRequset.onsuccess = ()=> {
          this.notes.push(note)
        }
      }
    },

    updateNote(note: Note): void {
      const indexStore = useIndexStore()
      if (indexStore && indexStore.db) {
        let transaction = indexStore.db.transaction("notes", "readwrite")
        let notesRequset = transaction.objectStore("notes").put(note)
        notesRequset.onsuccess = ()=> {
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

          notesRequset.onsuccess = ()=> {
            const index = this.notes.findIndex(item => item.id === this.selectedNote?.id)
            this.notes.splice(index, 1)
          }
        }
        
      }
    }
  },
})