import { useIndexStore } from '~/stores/index'

export default defineNuxtPlugin(async () => {
  if (process.client) {
    console.log('Start DB');
    
    let openRequest = window.indexedDB.open("notesDB", 1);

    openRequest.onupgradeneeded  = function() {
      let db = openRequest.result;
      if (!db.objectStoreNames.contains('notes')) {
        db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true })
      }
    };

    const initDB = new Promise<void>((resolve) => {
      openRequest.onsuccess = function() {
        console.log('in process');
        let db = openRequest.result;
        const store = useIndexStore()
        store.setIndexDb(db)
        resolve()
      };
    }) 

    await initDB
    console.log('finish');
    
  }
})