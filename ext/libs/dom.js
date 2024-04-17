export function create(element, attributes) {
  const e = document.createElement(element);

  for (const key in attributes) {
    e.setAttribute(key, attributes[key]);
  }

  return e;
}
