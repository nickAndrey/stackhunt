import dbOpen from './db-open';

type Args<T> = {
  dbName: string;
  storeName: string;
  data: T;
};

async function dbWrite<T>({ dbName, storeName, data }: Args<T>): Promise<T> {
  const db = await dbOpen({ dbName, storeName });
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);

  return new Promise((resolve, reject) => {
    const putRequest = store.put(data);

    putRequest.onsuccess = () => {
      const key = putRequest.result;
      const getRequest = store.get(key);

      getRequest.onsuccess = () => resolve(getRequest.result);
      getRequest.onerror = () => reject(getRequest.error);
    };

    putRequest.onerror = () => reject(putRequest.error);
  });
}

export default dbWrite;
