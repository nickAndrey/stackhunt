import dbOpen from './db-open';

type Args = {
  dbName: string;
  storeName: string;
  searchId: string;
};

async function dbGet<T>({ dbName, storeName, searchId }: Args): Promise<T | null> {
  const db = await dbOpen({ dbName, storeName });
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);

  return new Promise((resolve, reject) => {
    const request = store.get(searchId);

    transaction.oncomplete = () => resolve(request.result);
    transaction.onerror = () => reject(request.error);
  });
}

export default dbGet;
