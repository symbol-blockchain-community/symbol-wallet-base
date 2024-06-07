/*
  Symbol Blockchain Account Address の発行、整形、バリデーション
*/

import { PublicKey } from 'symbol-sdk';
import { Network, SymbolFacade } from 'symbol-sdk/symbol';
import { base32Decode, base32Encode } from '@/util/symbol/base32';

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
  private constructor(private readonly address: string) {
    this.address = address;
  }

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
   * Checks if an address string is valid and belongs to this network.
   * @param {string} address
   * @param {string} networkType Network name.
   * @returns {boolean} true if the decoded address is valid, false otherwise.
   */
  public static isValidAddress = (address: string, networkType: Network): boolean => {
    return new SymbolFacade(networkType).network.isValidAddressString(address);
  };

  /**
   * Create from public key
   * @param publicKey - The account public key.
   * @param networkType - The Symbol network type.
   * @returns {Address}
   */
  public static createFromPublicKey(publicKey: string, networkType: Network): AddressService {
    const address = new SymbolFacade(networkType).network.publicKeyToAddress(new PublicKey(publicKey));
    return new AddressService(address.toString());
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
  public static isValidRawAddress = (rawAddress: string, networkType: Network): boolean => {
    if (!['A', 'I', 'Q', 'Y'].includes(rawAddress.slice(-1).toUpperCase())) {
      return false;
    }
    try {
      return this.isValidAddress(this.stringToAddress(rawAddress).toString(), networkType);
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
