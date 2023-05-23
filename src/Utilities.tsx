import { ExpSource } from "./ExpSourcesComponent";
import { RecordService } from "pocketbase";
/**
 * Formats a number to a string as either an integer or a number up to hundredths place
 * @param {number} num - The number to format.
 * @returns {string} The formatted string.
 */
export function formatDecimal(num: number): string {
  num *= 100;
  num = Math.round(num);
  num /= 100;
  if (num % 1 !== 0) return num.toFixed(2);
  return num.toFixed(0);
}

/**
 * Retrieves data from a PocketBase collection and converts it to ExpSourceData
 * @param {RecordService} collection - The PocketBase collection to retrieve data from.
 * @returns {Promise<ExpSource[]>} A promise that resolves to an array of ExpSource objects.
 */
export async function getExpSourceData(
  collection: RecordService
): Promise<ExpSource[]> {

  let temp: ExpSource[] = [];
  let result = await collection.getFullList();

  for (let record of result) {
    temp.push({
      name: record.name,
      type: record.type,
      options: record.options,
    });
  }
  return temp;
}

export enum Color {
  primary,
  secondary,
  tertiary,
  quaternary,
}

/**
 * Gets CSS class for the given color
 * @param {Color} color - The color value
 * @returns {string} The CSS class (Note: dont add period)
 */
export function getColorClass(color: Color): string {
  switch (color) {
    case Color.primary:
      return "primary";
    case Color.secondary:
      return "secondary";
    case Color.tertiary:
      return "tertiary";
    case Color.quaternary:
      return "quaternary";
  }
}
