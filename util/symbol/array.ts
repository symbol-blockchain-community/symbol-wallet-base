// 以下の実装は symbol-sdk@2 を元に作成されています。

/**
 * Copies elements from a source array to a destination array.
 * @param dest The destination array.
 * @param src The source array.
 * @param [numElementsToCopy=undefined] The number of elements to copy.
 * @param [destOffset=0] The first index of the destination to write.
 * @param [srcOffset=0] The first index of the source to read.
 */
export function rawArrayCopy(
  dest: Uint8Array,
  src: Uint8Array,
  numElementsToCopy?: number,
  destOffset: number = 0,
  srcOffset: number = 0
): void {
  const length: number = undefined === numElementsToCopy ? dest.length : numElementsToCopy;
  for (let i = 0; i < length; ++i) {
    dest[destOffset + i] = src[srcOffset + i];
  }
}

/**
 * Creates a Uint8Array view on top of input.
 * @param {ArrayBuffer|Uint8Array} input The input array.
 * @returns {Uint8Array} A Uint8Array view on top of input.
 */
export function rawArrayUint8View(input: ArrayBuffer | Uint8Array): Uint8Array {
  if (ArrayBuffer === input.constructor) {
    return new Uint8Array(input);
  } else if (Uint8Array === input.constructor) {
    return input;
  }

  throw Error('unsupported type passed to uint8View');
}

/**
 * Deeply checks the equality of two arrays.
 * @param {Array} lhs First array to compare.
 * @param {Array} rhs Second array to compare.
 * @param {number} [numElementsToCompare=undefined] The number of elements to compare.
 * @returns {boolean} true if all compared elements are equal, false otherwise.
 */
export function rawArrayDeepEqual(lhs: Uint8Array, rhs: Uint8Array, numElementsToCompare?: number): boolean {
  let length = numElementsToCompare;
  if (undefined === length) {
    if (lhs.length !== rhs.length) {
      return false;
    }
    length = lhs.length;
  }

  if (length > lhs.length || length > rhs.length) {
    return false;
  }

  for (let i = 0; i < length; ++i) {
    if (lhs[i] !== rhs[i]) {
      return false;
    }
  }

  return true;
}
