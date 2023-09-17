import { defineStore } from 'pinia'

export const useIndexStore = defineStore('index', {
  state: () => ({ 
    db: null as IDBDatabase | null, 
  }),

  actions: {
    setIndexDb (db: any) {
      this.db = db
    }
  },
})