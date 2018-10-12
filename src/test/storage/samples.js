function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('TestAnalyser', 1)

    request.onupgradeneeded = e => {
      const db = e.target.result
      const objectStore = db.createObjectStore('samples', {
        keypath: 'id',
        autoIncrement: true,
      })
      objectStore.createIndex('blob', 'blob', { unique: false })
    }

    request.onsuccess = () => {
      const db = request.result
      resolve(db)
    }

    request.onerror = () => reject(request.error)
  })
}

export function load() {
  return openDB().then(
    db =>
      new Promise((resolve, reject) => {
        const samples = []

        const request = db
          .transaction('samples')
          .objectStore('samples')
          .openCursor()

        request.onsuccess = e => {
          const cursor = e.target.result
          if (cursor) {
            samples.push(cursor.value.blob)
            cursor.continue()
          } else {
            resolve(samples)
          }
        }

        request.onerror = () => reject(request.error)
      }),
  )
}

export function save(sample) {
  return openDB().then(
    db =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction('samples', 'readwrite')
        const store = transaction.objectStore('samples')
        store.add({ blob: sample })
        transaction.oncomplete = resolve
        transaction.onerror = reject
      }),
  )
}
