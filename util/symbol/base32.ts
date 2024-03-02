const Decoded_Block_Size = 5;
const Encoded_Block_Size = 8;
const Alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

const createBuilder = (): any => {
  const map: { [key: string]: number } = {};
  return {
    map,
    /**
     * Adds a range mapping to the map.
     * @param {string} start The start character.
     * @param {string} end The end character.
     * @param {number} base The value corresponding to the start character.
     * @memberof module:utils/charMapping~CharacterMapBuilder
     * @instance
     */
    addRange: (start: string, end: string, base: number): void => {
      const startCode = start.charCodeAt(0);
      const endCode = end.charCodeAt(0);

      for (let code = startCode; code <= endCode; ++code) {
        map[String.fromCharCode(code)] = code - startCode + base;
      }
    },
  };
};

const Char_To_Decoded_Char_Map = (): any => {
  const builder = createBuilder();
  builder.addRange('A', 'Z', 0);
  builder.addRange('2', '7', 26);
  return builder.map;
};

const decodeChar = (c: any): any => {
  const charMap = Char_To_Decoded_Char_Map();
  const decodedChar = charMap[c];
  if (undefined !== decodedChar) {
    return decodedChar;
  }
  throw Error(`illegal base32 character ${c}`);
};

const encodeBlock = (input: any, inputOffset: number, output: any, outputOffset: number): any => {
  output[outputOffset + 0] = Alphabet[input[inputOffset + 0] >> 3];
  output[outputOffset + 1] = Alphabet[((input[inputOffset + 0] & 0x07) << 2) | (input[inputOffset + 1] >> 6)];
  output[outputOffset + 2] = Alphabet[(input[inputOffset + 1] & 0x3e) >> 1];
  output[outputOffset + 3] = Alphabet[((input[inputOffset + 1] & 0x01) << 4) | (input[inputOffset + 2] >> 4)];
  output[outputOffset + 4] = Alphabet[((input[inputOffset + 2] & 0x0f) << 1) | (input[inputOffset + 3] >> 7)];
  output[outputOffset + 5] = Alphabet[(input[inputOffset + 3] & 0x7f) >> 2];
  output[outputOffset + 6] = Alphabet[((input[inputOffset + 3] & 0x03) << 3) | (input[inputOffset + 4] >> 5)];
  output[outputOffset + 7] = Alphabet[input[inputOffset + 4] & 0x1f];
};

const decodeBlock = (input: any, inputOffset: number, output: any, outputOffset: number): any => {
  const bytes = new Uint8Array(Encoded_Block_Size);
  for (let i = 0; i < Encoded_Block_Size; ++i) {
    bytes[i] = decodeChar(input[inputOffset + i]);
  }

  output[outputOffset + 0] = (bytes[0] << 3) | (bytes[1] >> 2);
  output[outputOffset + 1] = ((bytes[1] & 0x03) << 6) | (bytes[2] << 1) | (bytes[3] >> 4);
  output[outputOffset + 2] = ((bytes[3] & 0x0f) << 4) | (bytes[4] >> 1);
  output[outputOffset + 3] = ((bytes[4] & 0x01) << 7) | (bytes[5] << 2) | (bytes[6] >> 3);
  output[outputOffset + 4] = ((bytes[6] & 0x07) << 5) | bytes[7];
};

/**
 * Base32 encodes a binary buffer.
 * @param {Uint8Array} data The binary data to encode.
 * @returns {string} The base32 encoded string corresponding to the input data.
 */
export function base32Encode(data: Uint8Array): string {
  if (data.length % Decoded_Block_Size !== 0) {
    throw Error(`decoded size must be multiple of ${Decoded_Block_Size}`);
  }
  const output = new Array((data.length / Decoded_Block_Size) * Encoded_Block_Size);
  for (let i = 0; i < data.length / Decoded_Block_Size; ++i) {
    encodeBlock(data, i * Decoded_Block_Size, output, i * Encoded_Block_Size);
  }
  return output.join('');
}

/**
 * Base32 decodes a base32 encoded string.
 * @param {string} encoded The base32 encoded string to decode.
 * @returns {Uint8Array} The binary data corresponding to the input string.
 */
export function base32Decode(encoded: string): Uint8Array {
  if (encoded.length % Encoded_Block_Size !== 0) {
    throw Error(`encoded size must be multiple of ${Encoded_Block_Size}`);
  }

  const output = new Uint8Array((encoded.length / Encoded_Block_Size) * Decoded_Block_Size);
  for (let i = 0; i < encoded.length / Encoded_Block_Size; ++i) {
    decodeBlock(encoded, i * Encoded_Block_Size, output, i * Decoded_Block_Size);
  }
  return output;
}
