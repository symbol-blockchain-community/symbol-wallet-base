/* tslint:disable */
/* eslint-disable */
/**
 * Catapult REST Endpoints
 * OpenAPI Specification of catapult-rest
 *
 * The version of the OpenAPI document: 1.0.4
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { NetworkTypeEnum } from './NetworkTypeEnum';
import { NetworkTypeEnumFromJSON, NetworkTypeEnumFromJSONTyped, NetworkTypeEnumToJSON } from './NetworkTypeEnum';

/**
 *
 * @export
 * @interface BlockDTO
 */
export interface BlockDTO {
  /**
   * A number that allows uint 32 values.
   * @type {number}
   * @memberof BlockDTO
   */
  size: number;
  /**
   * Entity's signature generated by the signer.
   * @type {string}
   * @memberof BlockDTO
   */
  signature: string;
  /**
   * Public key.
   * @type {string}
   * @memberof BlockDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof BlockDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof BlockDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof BlockDTO
   */
  type: number;
  /**
   * Height of the blockchain.
   * @type {string}
   * @memberof BlockDTO
   */
  height: string;
  /**
   * Number of milliseconds elapsed since the creation of the nemesis block. This value can be converted to epoch time by adding the network's 'epochAdjustment'.
   * @type {string}
   * @memberof BlockDTO
   */
  timestamp: string;
  /**
   * Determines how hard is to harvest a new block, based on previous blocks.
   * @type {string}
   * @memberof BlockDTO
   */
  difficulty: string;
  /**
   * 32-bytes VRF proof gamma.
   * @type {string}
   * @memberof BlockDTO
   */
  proofGamma: string;
  /**
   * 16-bytes VRF proof verification hash.
   * @type {string}
   * @memberof BlockDTO
   */
  proofVerificationHash: string;
  /**
   * 32-bytes VRF proof scalar.
   * @type {string}
   * @memberof BlockDTO
   */
  proofScalar: string;
  /**
   *
   * @type {string}
   * @memberof BlockDTO
   */
  previousBlockHash: string;
  /**
   *
   * @type {string}
   * @memberof BlockDTO
   */
  transactionsHash: string;
  /**
   *
   * @type {string}
   * @memberof BlockDTO
   */
  receiptsHash: string;
  /**
   *
   * @type {string}
   * @memberof BlockDTO
   */
  stateHash: string;
  /**
   * Address encoded using a 32-character set.
   * @type {string}
   * @memberof BlockDTO
   */
  beneficiaryAddress: string;
  /**
   * Fee multiplier applied to transactions contained in block.
   * @type {number}
   * @memberof BlockDTO
   */
  feeMultiplier: number;
}

/**
 * Check if a given object implements the BlockDTO interface.
 */
export function instanceOfBlockDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'size' in value;
  isInstance = isInstance && 'signature' in value;
  isInstance = isInstance && 'signerPublicKey' in value;
  isInstance = isInstance && 'version' in value;
  isInstance = isInstance && 'network' in value;
  isInstance = isInstance && 'type' in value;
  isInstance = isInstance && 'height' in value;
  isInstance = isInstance && 'timestamp' in value;
  isInstance = isInstance && 'difficulty' in value;
  isInstance = isInstance && 'proofGamma' in value;
  isInstance = isInstance && 'proofVerificationHash' in value;
  isInstance = isInstance && 'proofScalar' in value;
  isInstance = isInstance && 'previousBlockHash' in value;
  isInstance = isInstance && 'transactionsHash' in value;
  isInstance = isInstance && 'receiptsHash' in value;
  isInstance = isInstance && 'stateHash' in value;
  isInstance = isInstance && 'beneficiaryAddress' in value;
  isInstance = isInstance && 'feeMultiplier' in value;

  return isInstance;
}

export function BlockDTOFromJSON(json: any): BlockDTO {
  return BlockDTOFromJSONTyped(json, false);
}

export function BlockDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): BlockDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    size: json['size'],
    signature: json['signature'],
    signerPublicKey: json['signerPublicKey'],
    version: json['version'],
    network: NetworkTypeEnumFromJSON(json['network']),
    type: json['type'],
    height: json['height'],
    timestamp: json['timestamp'],
    difficulty: json['difficulty'],
    proofGamma: json['proofGamma'],
    proofVerificationHash: json['proofVerificationHash'],
    proofScalar: json['proofScalar'],
    previousBlockHash: json['previousBlockHash'],
    transactionsHash: json['transactionsHash'],
    receiptsHash: json['receiptsHash'],
    stateHash: json['stateHash'],
    beneficiaryAddress: json['beneficiaryAddress'],
    feeMultiplier: json['feeMultiplier'],
  };
}

export function BlockDTOToJSON(value?: BlockDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    size: value.size,
    signature: value.signature,
    signerPublicKey: value.signerPublicKey,
    version: value.version,
    network: NetworkTypeEnumToJSON(value.network),
    type: value.type,
    height: value.height,
    timestamp: value.timestamp,
    difficulty: value.difficulty,
    proofGamma: value.proofGamma,
    proofVerificationHash: value.proofVerificationHash,
    proofScalar: value.proofScalar,
    previousBlockHash: value.previousBlockHash,
    transactionsHash: value.transactionsHash,
    receiptsHash: value.receiptsHash,
    stateHash: value.stateHash,
    beneficiaryAddress: value.beneficiaryAddress,
    feeMultiplier: value.feeMultiplier,
  };
}
