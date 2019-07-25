function copyObjectEntries(fromObject) {
  const copiedObject = {};

  // tslint:disable-next-line: forin
  for (const key in fromObject) {
    copiedObject[key] = deepCopy(fromObject[key]);
  }

  return copiedObject;
}

function copyArrayItems(fromArray) {
  const copiedArray = fromArray.map((item) => {
    return deepCopy(item);
  });

  return copiedArray;
}

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export default function deepCopy(item) {
  let copy = item;

  if (Array.isArray(item)) {
    copy = copyArrayItems(item);
  }

  if (isObject(item)) {
    copy = copyObjectEntries(item);
  }

  return copy;
}