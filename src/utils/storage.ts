/**
 * Dentrix IndexedDB & Storage Abstraction Layer
 * Ensures unlimited record retention for clinical notes, radiographs, audit logs,
 * overcoming browser 5MB localStorage limits while keeping offline capability.
 */

const DB_NAME = 'dentrix_clinical_db';
const DB_VERSION = 1;

const STORES = [
  'patients',
  'appointments',
  'clinical_notes',
  'invoices',
  'prescriptions',
  'radiographs',
  'perio_charts',
  'treatment_plans',
  'audit_logs',
  'operatory_chairs',
] as const;

type StoreName = (typeof STORES)[number];

let dbInstance: IDBDatabase | null = null;

export const initIndexedDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      STORES.forEach((store) => {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, { keyPath: 'id' });
        }
      });
    };

    request.onsuccess = (event) => {
      dbInstance = (event.target as IDBOpenDBRequest).result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error('IndexedDB open error:', event);
      reject(request.error);
    };
  });
};

/**
 * Bulk save array of records into IndexedDB store
 */
export const saveBulkToIndexedDB = async <T extends { id: string }>(
  storeName: StoreName,
  items: T[]
): Promise<void> => {
  try {
    const db = await initIndexedDB();
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);

    items.forEach((item) => {
      store.put(item);
    });

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn(`[IndexedDB] Failed saving ${storeName}:`, err);
  }
};

/**
 * Fetch all records from IndexedDB store
 */
export const getAllFromIndexedDB = async <T>(storeName: StoreName): Promise<T[]> => {
  try {
    const db = await initIndexedDB();
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.getAll();

    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn(`[IndexedDB] Failed fetching ${storeName}:`, err);
    return [];
  }
};

/**
 * Safe LocalStorage setter with QuotaExceededError protection and IndexedDB background replication
 */
export const safeStorageSet = <T extends { id: string }>(
  key: string,
  value: T[],
  idbStoreName?: StoreName
): void => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (err) {
    console.warn(`[Storage] localStorage quota reached for ${key}. Falling back to IndexedDB.`, err);
  }

  // Background mirror to IndexedDB if store provided
  if (idbStoreName) {
    saveBulkToIndexedDB(idbStoreName, value).catch(() => {});
  }
};

export interface StorageMetrics {
  usageBytes: number;
  quotaBytes: number;
  usageFormatted: string;
  quotaFormatted: string;
  usagePercent: number;
  isIndexedDBSupported: boolean;
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * Real-time storage estimate monitor using navigator.storage
 */
export const getStorageEstimate = async (): Promise<StorageMetrics> => {
  const isSupported = typeof window !== 'undefined' && 'storage' in navigator && 'estimate' in navigator.storage;

  if (isSupported) {
    try {
      const estimate = await navigator.storage.estimate();
      const usage = estimate.usage || 0;
      const quota = estimate.quota || 50 * 1024 * 1024; // fallback 50MB
      const percent = quota > 0 ? (usage / quota) * 100 : 0;

      return {
        usageBytes: usage,
        quotaBytes: quota,
        usageFormatted: formatBytes(usage),
        quotaFormatted: formatBytes(quota),
        usagePercent: Math.min(100, Math.round(percent * 10) / 10),
        isIndexedDBSupported: true,
      };
    } catch (e) {
      console.warn('Storage estimate failed', e);
    }
  }

  // Fallback estimation using localStorage payload sizes
  let roughBytes = 0;
  if (typeof window !== 'undefined' && window.localStorage) {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('dentrix_')) {
        roughBytes += (localStorage.getItem(k) || '').length * 2;
      }
    }
  }

  return {
    usageBytes: roughBytes,
    quotaBytes: 5 * 1024 * 1024,
    usageFormatted: formatBytes(roughBytes),
    quotaFormatted: '5 MB (LocalStorage)',
    usagePercent: Math.round((roughBytes / (5 * 1024 * 1024)) * 100),
    isIndexedDBSupported: typeof window !== 'undefined' && !!window.indexedDB,
  };
};
