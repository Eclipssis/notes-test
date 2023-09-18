import { useIndexStore } from '~/stores/index'

export default defineNuxtPlugin(async () => {
  if (process.client) {
    let openRequest = window.indexedDB.open("notesDB", 1);

    openRequest.onupgradeneeded  = function() {
      let db = openRequest.result;
      if (!db.objectStoreNames.contains('notes')) {
        db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true })
      }
    };

    const initDB = new Promise<void>((resolve) => {
      openRequest.onsuccess = function() {
        let db = openRequest.result;
        const store = useIndexStore()
        store.setIndexDb(db)
        resolve()
      };
    }) 

    await initDB
  }
})