import dbOpen from './db-open';

type Args = {
  dbName: string;
  storeName: string;
  searchId: string;
};

async function dbDelete({ dbName, storeName, searchId }: Args) {
  const db = await dbOpen({ dbName, storeName });
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);

  return new Promise((resolve, reject) => {
    const request = store.delete(searchId);

    transaction.oncomplete = () => resolve(request.result);
    transaction.onerror = () => reject(request.error);
  });
}

export default dbDelete;
