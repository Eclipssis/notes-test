import { defineStore } from 'pinia'
import { useIndexStore } from '~/stores/index'

// TODO move type to folder
export interface Note {
  title: string,
  body: string,
  createdAt: Date,
}

interface State {
  notes: Note[]
}

export const useNotesStore = defineStore('notes', {
  state: (): State => ({ 
    notes: [],
  }),

  actions: {
    getAll(): Promise<Note[]> {
      
      const indexStore = useIndexStore()

      return new Promise((resolve, reject) => {
        if (indexStore && indexStore.db) {
          let transaction = indexStore.db.transaction("notes", "readwrite")
          let notesStore = transaction.objectStore("notes")
          const noteRecords = notesStore.getAll()

          noteRecords.onsuccess = function() {
            resolve(noteRecords.result)
          }

          noteRecords.onerror = function() {
            reject([])
          }
        } else {
          resolve([])
        }
      })
    },

    createNote (note: Note) {
      const indexStore = useIndexStore()
      if (indexStore && indexStore.db) {
        let transaction = indexStore.db.transaction("notes", "readwrite")
        let notes = transaction.objectStore("notes")
        notes.add(note)
      }
    }
  },
})