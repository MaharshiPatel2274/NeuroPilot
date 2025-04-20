import Store from 'electron-store';
const store = new Store();

export function pushContext(key, data, max = 5) {
  console.log('MemoryStore: pushContext', key, data);
  const arr = store.get(key, []);
  arr.unshift(data);
  if (arr.length > max) arr.pop();
  store.set(key, arr);
}

export function getContext(key) {
  console.log('MemoryStore: getContext', key);
  return store.get(key, []);
}