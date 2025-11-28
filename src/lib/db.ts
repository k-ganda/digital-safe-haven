const DB_NAME = 'AmaniDigitalDB';
const DB_VERSION = 1;
const REPORT_STORE = 'reports';
const LOCKER_STORE = 'locker';

let db: IDBDatabase;

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(REPORT_STORE)) {
        db.createObjectStore(REPORT_STORE, { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains(LOCKER_STORE)) {
        db.createObjectStore(LOCKER_STORE, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      resolve(true);
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
};

export const addReport = (report: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([REPORT_STORE], 'readwrite');
    const store = transaction.objectStore(REPORT_STORE);
    const request = store.add(report);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getReports = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([REPORT_STORE], 'readonly');
    const store = transaction.objectStore(REPORT_STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const addLockerItem = (item: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([LOCKER_STORE], 'readwrite');
    const store = transaction.objectStore(LOCKER_STORE);
    const request = store.add(item);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getLockerItems = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([LOCKER_STORE], 'readonly');
    const store = transaction.objectStore(LOCKER_STORE);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const clearAllData = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reportTransaction = db.transaction([REPORT_STORE], 'readwrite');
    const lockerTransaction = db.transaction([LOCKER_STORE], 'readwrite');

    const reportStore = reportTransaction.objectStore(REPORT_STORE);
    const lockerStore = lockerTransaction.objectStore(LOCKER_STORE);

    const clearReportRequest = reportStore.clear();
    const clearLockerRequest = lockerStore.clear();

    let completed = 0;
    const checkCompletion = () => {
        completed++;
        if (completed === 2) {
            resolve();
        }
    }

    clearReportRequest.onsuccess = checkCompletion;
    clearLockerRequest.onsuccess = checkCompletion;

    clearReportRequest.onerror = () => reject(clearReportRequest.error);
    clearLockerRequest.onerror = () => reject(clearLockerRequest.error);
  });
};