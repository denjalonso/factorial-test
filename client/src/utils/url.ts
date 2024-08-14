function convertValue(value: string): any {
  if (/^\d+(\.\d+)?$/.test(value)) {
    return parseFloat(value);
  }
  // boolean properties should deserialize as a boolean value (e.g. true), not as a string (e.g. "true")
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }

  // null properties should deserialize as null, not as the string "null"
  if (value === 'null') {
    return null;
  }

  const matches = value.match(/^"(.+)"$/);
  if (matches && typeof convertValue(matches[1]) !== 'string') {
    return matches[1];
  }

  return value;
}

function decodeParameters(
    searchParams: URLSearchParams,
): Record<string, unknown> {
  const data: { [key: string]: any } = {};

  searchParams.forEach((value, key) => {
    const keys = key.split('.');
    let currentObj = data;

    keys.forEach((propKey, i) => {
      const isArrayItem = propKey.includes('_');

      if (i === keys.length - 1) {
        if (isArrayItem) {
          const [arrayKey, indexStr] = propKey.split('_');
          const index = Number(indexStr);

          if (!Array.isArray(currentObj[arrayKey])) {
            currentObj[arrayKey] = [];
          }

          currentObj[arrayKey][index] = convertValue(value);
        } else {
          currentObj[propKey] = convertValue(value);
        }
      } else {
        if (isArrayItem) {
          const [arrayKey, indexStr] = propKey.split('_');
          const index = Number(indexStr);

          if (!Array.isArray(currentObj[arrayKey])) {
            currentObj[arrayKey] = [];
          }

          if (!currentObj[arrayKey][index]) {
            currentObj[arrayKey][index] = {};
          }

          currentObj = currentObj[arrayKey][index];
        } else {
          if (!currentObj[propKey]) {
            currentObj[propKey] = {};
          }

          currentObj = currentObj[propKey];
        }
      }
    });
  });

  return data;
}

function getParsedURL(url: string | URL = window.location.href) {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname.replace(/\/$|$/, '/');
  const searchParams = decodeParameters(urlObj.searchParams);
  return { pathname, searchParams, url: urlObj };
}

export { getParsedURL };
