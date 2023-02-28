import { openDB } from "idb";

const dbName = "crowd";
const version = 2;

const stores = [
	{
		name: "projects",
		keyPath: "name",
		autoIncrement: false,
	},
	{
		name: "shared",
		keyPath: "name",
		autoIncrement: false,
	},
];

export const DB = openDB(dbName, version, {
  upgrade(db) {
    console.log("Upgrade db: ", dbName);

	stores.forEach((store) => {

		const { name, keyPath, autoIncrement } = store;

		if (!db.objectStoreNames.contains(name)) {
			db.createObjectStore(name, {
				keyPath,
				autoIncrement,
			});
		}
	});
  },
});

/**
 * Get item by id
 * @param {String} uid name/key
 * @returns {Promise<Object>} single item from store
 */
export async function getItemById(uid, storeName = 'projects') {
  return (await DB).get(storeName, uid);
}

/**
 * Set item (item/Object must have name/key)
 * @param {Object} item object to store
 * @returns {Promise<Object>} single item from store
 */
export async function setItem(item, storeName = 'projects') {
  return (await DB).put(storeName, item);
}

/**
 * Delete item by id
 * @param {String} uid project name
 * @returns {Promise<Object>} single item from store
 */
export async function deleteItemById(uid, storeName = 'projects') {
  return (await DB).delete(storeName, uid);
}

/**
 * Get  store
 */
export async function getStore(storeName = 'projects') {
  return (await DB).get(storeName);
}

/**
 * Get all items from the database store
 * @returns {Promise} resolves  array of items
 */
export async function getItems(storeName = 'projects') {
  return (await DB).getAll(storeName);
}

/**
 * Set all items to the database store
 * @param {Array} array of items
 * @returns {Promise} resolves undefined
 */
export async function setItems(array, storeName = 'projects') {
  const db = await DB;
  const tx = db.transaction(storeName, "readwrite");
  return Promise.all(array.map((item) => tx.store.put(item)));
}

/**
 * Get all keys/ids from a database store
 * @returns {Promise} resolves  array of keys
 */
export async function getKeys(storeName = 'projects') {
  return (await DB).getAllKeys(storeName);
}

/**
 * Get all items by type the database store
 * @param {String} type - solution, development, etc
 * @returns {Promise} resolves  array of items
 */
export async function getItemsByType(type, storeName = 'projects') {
  const items = (await DB).getAll(storeName);
  return (await items).filter((item) => item.type === type);
}
