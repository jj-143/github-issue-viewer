type Value = string | number | boolean | undefined | null;

/**
 * Returns a search string encoded from an object
 *
 * @param simpleObject has only primitive values
 */
export default function toSearchString(simpleObject: Record<string, Value>) {
  return Object.entries(simpleObject)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(
      ([k, v]) =>
        `${k}=${encodeURIComponent(v as Exclude<Value, null | undefined>)}`,
    )
    .join("&");
}
