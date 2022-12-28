import { openDB } from "idb";

const dbName = "crowd";
const version = 1;

const store = {
  name: "projects",
  keyPath: "name",
  autoIncrement: false,
};

export const DB = openDB(dbName, version, {
  upgrade(db) {
    console.log("Upgrade db: ", dbName);

    const { name, keyPath, autoIncrement } = store;

    if (!db.objectStoreNames.contains(name)) {
      db.createObjectStore(name, {
        keyPath,
        autoIncrement,
      });
    }
  },
});

/**
 * Get item by id
 * @param {String} uid name/key
 * @returns {Promise<Object>} single item from store
 */
export async function getItemById(uid) {
  return (await DB).get(store.name, uid);
}

/**
 * Set item (item/Object must have name/key)
 * @param {Object} item object to store
 * @returns {Promise<Object>} single item from store
 */
export async function setItem(item) {
  return (await DB).put(store.name, item);
}

/**
 * Delete item by id
 * @param {String} uid project name
 * @returns {Promise<Object>} single item from store
 */
export async function deleteItemById(uid) {
  return (await DB).delete(store.name, uid);
}

/**
 * Get  store
 */
export async function getStore() {
  return (await DB).get(store.name);
}

/**
 * Get all items from the database store
 * @returns {Promise} resolves  array of items
 */
export async function getItems() {
  return (await DB).getAll(store.name);
}

/**
 * Set all items to the database store
 * @param {Array} array of items
 * @returns {Promise} resolves undefined
 */
export async function setItems(array) {
  const db = await DB;
  const tx = db.transaction(store.name, "readwrite");
  return Promise.all(array.map((item) => tx.store.put(item)));
}

/**
 * Get all keys/ids from a database store
 * @returns {Promise} resolves  array of keys
 */
export async function getKeys() {
  return (await DB).getAllKeys(store.name);
}

/**
 * Get all items by type the database store
 * @param {String} type - solution, development, etc
 * @returns {Promise} resolves  array of items
 */
export async function getItemsByType(type) {
  const items = (await DB).getAll(store.name);
  return (await items).filter((item) => item.type === type);
}
