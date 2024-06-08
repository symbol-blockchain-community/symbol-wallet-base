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
import type { LinkActionEnum } from './LinkActionEnum';
import { LinkActionEnumFromJSON, LinkActionEnumFromJSONTyped, LinkActionEnumToJSON } from './LinkActionEnum';
import type { NetworkTypeEnum } from './NetworkTypeEnum';
import { NetworkTypeEnumFromJSON, NetworkTypeEnumFromJSONTyped, NetworkTypeEnumToJSON } from './NetworkTypeEnum';

/**
 *
 * @export
 * @interface EmbeddedVrfKeyLinkTransactionDTO
 */
export interface EmbeddedVrfKeyLinkTransactionDTO {
  /**
   * Public key.
   * @type {string}
   * @memberof EmbeddedVrfKeyLinkTransactionDTO
   */
  signerPublicKey: string;
  /**
   * Entity version.
   * @type {number}
   * @memberof EmbeddedVrfKeyLinkTransactionDTO
   */
  version: number;
  /**
   *
   * @type {NetworkTypeEnum}
   * @memberof EmbeddedVrfKeyLinkTransactionDTO
   */
  network: NetworkTypeEnum;
  /**
   *
   * @type {number}
   * @memberof EmbeddedVrfKeyLinkTransactionDTO
   */
  type: number;
  /**
   * Public key.
   * @type {string}
   * @memberof EmbeddedVrfKeyLinkTransactionDTO
   */
  linkedPublicKey: string;
  /**
   *
   * @type {LinkActionEnum}
   * @memberof EmbeddedVrfKeyLinkTransactionDTO
   */
  linkAction: LinkActionEnum;
}

/**
 * Check if a given object implements the EmbeddedVrfKeyLinkTransactionDTO interface.
 */
export function instanceOfEmbeddedVrfKeyLinkTransactionDTO(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && 'signerPublicKey' in value;
  isInstance = isInstance && 'version' in value;
  isInstance = isInstance && 'network' in value;
  isInstance = isInstance && 'type' in value;
  isInstance = isInstance && 'linkedPublicKey' in value;
  isInstance = isInstance && 'linkAction' in value;

  return isInstance;
}

export function EmbeddedVrfKeyLinkTransactionDTOFromJSON(json: any): EmbeddedVrfKeyLinkTransactionDTO {
  return EmbeddedVrfKeyLinkTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedVrfKeyLinkTransactionDTOFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): EmbeddedVrfKeyLinkTransactionDTO {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    signerPublicKey: json['signerPublicKey'],
    version: json['version'],
    network: NetworkTypeEnumFromJSON(json['network']),
    type: json['type'],
    linkedPublicKey: json['linkedPublicKey'],
    linkAction: LinkActionEnumFromJSON(json['linkAction']),
  };
}

export function EmbeddedVrfKeyLinkTransactionDTOToJSON(value?: EmbeddedVrfKeyLinkTransactionDTO | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    signerPublicKey: value.signerPublicKey,
    version: value.version,
    network: NetworkTypeEnumToJSON(value.network),
    type: value.type,
    linkedPublicKey: value.linkedPublicKey,
    linkAction: LinkActionEnumToJSON(value.linkAction),
  };
}
