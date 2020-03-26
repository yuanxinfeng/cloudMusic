export function getValue(name) {
  return JSON.parse(window.localStorage.getItem(name));
}

export function setValue(name, value) {
  return window.localStorage.setItem(name, JSON.stringify(value));
}

export function removeValue(name) {
  return window.localStorage.removeItem(name);
}

export function clearStorage() {
  return window.localStorage.clear();
}
