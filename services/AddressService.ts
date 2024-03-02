/*

  Symbol Blockchain Account Address の発行、整形、バリデーション
  以下の実装の多くは symbol-sdk@2 より移植されています。

*/

import { sha3_256 } from 'js-sha3';
import ripemd160 from 'ripemd160';

import { NetworkType } from '@/models/NetworkModels';
import { rawArrayCopy, rawArrayDeepEqual, rawArrayUint8View } from '@/util/symbol/array';
import { base32Decode, base32Encode } from '@/util/symbol/base32';
import { strNetworkTypeToHexadecimal } from '@/util/symbol/network';

/**
 * Manage Symbol Account Address
 */
export class AddressService {
  private static readonly constants = {
    sizes: {
      ripemd160: 20,
      addressDecoded: 24,
      addressEncoded: 39,
      key: 32,
      checksum: 3,
    },
  };

  /**
   * @internal
   * @param address
   * @param networkType
   */
  private constructor(private readonly address: string) {}

  /**
   * Converts a decoded address to an encoded address string.
   * @param {Uint8Array} decoded The decoded address.
   * @returns {string} The encoded address string corresponding to the input.
   */
  private static addressToBase32 = (decoded: Uint8Array): string => {
    if (AddressService.constants.sizes.addressDecoded !== decoded.length) {
      throw Error(`${Buffer.from(decoded).toString('hex')} does not represent a valid decoded address`);
    }
    const padded = new Uint8Array(AddressService.constants.sizes.addressDecoded + 1);
    padded.set(decoded);
    return base32Encode(padded).slice(0, -1);
  };

  /**
   * Converts an encoded address string to a decoded address.
   * @param {string} encoded The encoded address string.
   * @returns {Uint8Array} The decoded address corresponding to the input.
   */
  private static stringToAddress = (encoded: string): Uint8Array => {
    if (this.constants.sizes.addressEncoded !== encoded.length) {
      throw Error(`${encoded} does not represent a valid encoded address`);
    }
    return base32Decode(`${encoded}A`).subarray(0, this.constants.sizes.addressDecoded);
  };

  /**
   * Determines the validity of a decoded address.
   * @param {Uint8Array} decoded The decoded address.
   * @returns {boolean} true if the decoded address is valid, false otherwise.
   */
  public static isValidAddress = (decoded: Uint8Array): boolean => {
    if (this.constants.sizes.addressDecoded !== decoded.length) {
      return false;
    }
    const hash = sha3_256.create();
    const checksumBegin = this.constants.sizes.addressDecoded - this.constants.sizes.checksum;
    hash.update(decoded.subarray(0, checksumBegin));
    const checksum = new Uint8Array(this.constants.sizes.checksum);
    rawArrayCopy(checksum, rawArrayUint8View(hash.arrayBuffer()), this.constants.sizes.checksum);
    return rawArrayDeepEqual(checksum, decoded.subarray(checksumBegin));
  };

  /**
   * Create from private key
   * @param publicKey - The account public key.
   * @param networkType - The NEM network type.
   * @returns {Address}
   */
  public static createFromPublicKey(publicKey: string, networkType: NetworkType): AddressService {
    const uint8: Uint8Array = Buffer.from(publicKey, 'hex');
    const publicKeyHash: ArrayBuffer = sha3_256.arrayBuffer(uint8);
    const ripemdHash: Uint8Array = new ripemd160().update(Buffer.from(publicKeyHash)).digest();

    // add network identifier byte
    const decodedAddress: Uint8Array = new Uint8Array(AddressService.constants.sizes.addressDecoded);
    decodedAddress[0] = strNetworkTypeToHexadecimal(networkType);
    rawArrayCopy(decodedAddress, ripemdHash, AddressService.constants.sizes.ripemd160, 1);

    // concatenate decodedAddress and the checksum of decodedAddress
    const hash = sha3_256.arrayBuffer(decodedAddress.subarray(0, AddressService.constants.sizes.ripemd160 + 1));
    rawArrayCopy(
      decodedAddress,
      rawArrayUint8View(hash),
      AddressService.constants.sizes.checksum,
      AddressService.constants.sizes.ripemd160 + 1
    );
    // convert to Base32 and create instance
    return new AddressService(this.addressToBase32(decodedAddress));
  }

  /**
   * Create an Address from a given raw address.
   * @param rawAddress - Address in string format. ex: SB3KUBHATFCPV7UZQLWAQ2EUR6SIHBSBEOEDDDF3 or SB3KUB-HATFCP-V7UZQL-WAQ2EU-R6SIHB-SBEOED-DDF3
   */
  public static createFromRawAddress(rawAddress: string): AddressService {
    // ハイフン削除
    const addressTrimAndUpperCase: string = rawAddress.trim().toUpperCase().replace(/-/g, '');
    if (addressTrimAndUpperCase.length !== 39) {
      throw new Error('Address ' + addressTrimAndUpperCase + ' has to be 39 characters long');
    }
    return new AddressService(addressTrimAndUpperCase);
  }

  /**
   * Create an Address from a given encoded address.
   * @param {string} encoded address. Expected format: 98354C48D24CFD080340973912F1A5C23F707F1092616EC7.
   */
  public static createFromEncoded(encoded: string): AddressService {
    const base32Address = this.addressToBase32(Buffer.from(encoded, 'hex'));
    return this.createFromRawAddress(base32Address);
  }

  /**
   * Determines the validity of an raw address string.
   * @param {string} rawAddress The raw address string. Expected format TATNE7Q5BITMUTRRN6IB4I7FLSDRDWZA37JGO5Q
   * @returns {boolean} true if the raw address string is valid, false otherwise.
   */
  public static isValidRawAddress = (rawAddress: string): boolean => {
    if (!['A', 'I', 'Q', 'Y'].includes(rawAddress.slice(-1).toUpperCase())) {
      return false;
    }
    try {
      return this.isValidAddress(this.stringToAddress(rawAddress));
    } catch {
      return false;
    }
  };

  /**
   * Get address in plain format ex: SB3KUBHATFCPV7UZQLWAQ2EUR6SIHBSBEOEDDDF3.
   * @returns {string}
   */
  public plain(): string {
    return this.address;
  }

  /**
   * Get address in the encoded format ex: NAR3W7B4BCOZSZMFIZRYB3N5YGOUSWIYJCJ6HDFH.
   * @returns {string}
   */
  public encoded(): string {
    return Buffer.from(AddressService.stringToAddress(this.address)).toString('hex');
  }

  /**
   * Get address in pretty format ex: SB3KUB-HATFCP-V7UZQL-WAQ2EU-R6SIHB-SBEOED-DDF3.
   * @returns {string}
   */
  public pretty(): string {
    return this.address.match(/.{1,6}/g)!.join('-');
  }

  /**
   * Encoded address or namespace id. Note that namespace id get the hex reversed and
   * zero padded.
   * @returns {Uint8Array}
   */
  public encodeUnresolvedAddress(): Uint8Array {
    return Buffer.from(this.encoded(), 'hex');
  }
}
