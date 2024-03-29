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
import type { NamespaceRegistrationTypeEnum } from './NamespaceRegistrationTypeEnum';
import {
  NamespaceRegistrationTypeEnumFromJSON,
  NamespaceRegistrationTypeEnumFromJSONTyped,
  NamespaceRegistrationTypeEnumToJSON,
} from './NamespaceRegistrationTypeEnum';
import type { NetworkTypeEnum } from './NetworkTypeEnum';
import { NetworkTypeEnumFromJSON, NetworkTypeEnumFromJSONTyped, NetworkTypeEnumToJSON } from './NetworkTypeEnum';

/**
 * Transaction to create or renew a namespace.
 * @export
 * @interface NamespaceRegistrationTransactionDTO
 */
export interface NamespaceRegistrationTransactionDTO {
  /**
   * A number that allows uint 32 values.
   * @type {number}
   * @memberof NamespaceRegistrationTransactionDTO
   */
  size: number;
  /**
   * Entity's signature generated by the signer.
   * @type {string}
   * @memberof NamespaceRegistrationTransactionDTO
   */
  signature: string;
  /**
   * Public key.
   * @type {string}
   * @memberof NamespaceRegistrationTransactionDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof NamespaceRegistrationTransactionDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof NamespaceRegistrationTransactionDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof NamespaceRegistrationTransactionDTO
   */
  type: number;
  /**
   * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
   * @type {string}
   * @memberof NamespaceRegistrationTransactionDTO
   */
  maxFee: string;
  /**
   * Duration expressed in number of blocks.
   * @type {string}
   * @memberof NamespaceRegistrationTransactionDTO
   */
  deadline: string;
  /**
   * Duration expressed in number of blocks.
   * @type {string}
   * @memberof NamespaceRegistrationTransactionDTO
   */
  duration?: string;
  /**
   * Namespace identifier.
   * @type {string}
   * @memberof NamespaceRegistrationTransactionDTO
   */
  parentId?: string;
  /**
   * Namespace identifier.
   * @type {string}
   * @memberof NamespaceRegistrationTransactionDTO
   */
  id: string;
  /**
   *
   * @type {NamespaceRegistrationTypeEnum}
   * @memberof NamespaceRegistrationTransactionDTO
   */
  registrationType: NamespaceRegistrationTypeEnum;
  /**
   * Namespace name.
   * @type {string}
   * @memberof NamespaceRegistrationTransactionDTO
   */
  name: string;
}

/**
 * Check if a given object implements the NamespaceRegistrationTransactionDTO interface.
 */
export function instanceOfNamespaceRegistrationTransactionDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'size' in value;
  isInstance = isInstance && 'signature' in value;
  isInstance = isInstance && 'signerPublicKey' in value;
  isInstance = isInstance && 'version' in value;
  isInstance = isInstance && 'network' in value;
  isInstance = isInstance && 'type' in value;
  isInstance = isInstance && 'maxFee' in value;
  isInstance = isInstance && 'deadline' in value;
  isInstance = isInstance && 'id' in value;
  isInstance = isInstance && 'registrationType' in value;
  isInstance = isInstance && 'name' in value;

  return isInstance;
}

export function NamespaceRegistrationTransactionDTOFromJSON(json: any): NamespaceRegistrationTransactionDTO {
  return NamespaceRegistrationTransactionDTOFromJSONTyped(json, false);
}

export function NamespaceRegistrationTransactionDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): NamespaceRegistrationTransactionDTO {
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
    maxFee: json['maxFee'],
    deadline: json['deadline'],
    duration: !exists(json, 'duration') ? undefined : json['duration'],
    parentId: !exists(json, 'parentId') ? undefined : json['parentId'],
    id: json['id'],
    registrationType: NamespaceRegistrationTypeEnumFromJSON(json['registrationType']),
    name: json['name'],
  };
}

export function NamespaceRegistrationTransactionDTOToJSON(value?: NamespaceRegistrationTransactionDTO | null): any {
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
    maxFee: value.maxFee,
    deadline: value.deadline,
    duration: value.duration,
    parentId: value.parentId,
    id: value.id,
    registrationType: NamespaceRegistrationTypeEnumToJSON(value.registrationType),
    name: value.name,
  };
}
