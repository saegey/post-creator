export const parseJsonFields = <T extends object, K extends keyof T>(
  obj: T,
  fields: K[]
): T & Partial<Record<K, any>> => {
  const parsedObj = { ...obj };
  fields.forEach((field) => {
    const value = obj[field];
    if (typeof value === "string") {
      try {
        parsedObj[field] = JSON.parse(value);
      } catch (e) {
        console.error(`Error parsing field ${String(field)}:`, e);
        parsedObj[field] = null as unknown as T[K];
      }
    }
  });
  return parsedObj;
};
