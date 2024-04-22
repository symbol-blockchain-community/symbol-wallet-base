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

import { exists, mapValues } from '../runtime.js';
import type { LinkActionEnum } from './LinkActionEnum.js';
import {
    LinkActionEnumFromJSON,
    LinkActionEnumFromJSONTyped,
    LinkActionEnumToJSON,
} from './LinkActionEnum.js';
import type { NetworkTypeEnum } from './NetworkTypeEnum.js';
import {
    NetworkTypeEnumFromJSON,
    NetworkTypeEnumFromJSONTyped,
    NetworkTypeEnumToJSON,
} from './NetworkTypeEnum.js';

/**
 * 
 * @export
 * @interface EmbeddedAccountKeyLinkTransactionDTO
 */
export interface EmbeddedAccountKeyLinkTransactionDTO {
    /**
     * Public key.
     * @type {string}
     * @memberof EmbeddedAccountKeyLinkTransactionDTO
     */
    signerPublicKey: string;
    /**
     * Entity version.
     * @type {number}
     * @memberof EmbeddedAccountKeyLinkTransactionDTO
     */
    version: number;
    /**
     * 
     * @type {NetworkTypeEnum}
     * @memberof EmbeddedAccountKeyLinkTransactionDTO
     */
    network: NetworkTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof EmbeddedAccountKeyLinkTransactionDTO
     */
    type: number;
    /**
     * Public key.
     * @type {string}
     * @memberof EmbeddedAccountKeyLinkTransactionDTO
     */
    linkedPublicKey: string;
    /**
     * 
     * @type {LinkActionEnum}
     * @memberof EmbeddedAccountKeyLinkTransactionDTO
     */
    linkAction: LinkActionEnum;
}

/**
 * Check if a given object implements the EmbeddedAccountKeyLinkTransactionDTO interface.
 */
export function instanceOfEmbeddedAccountKeyLinkTransactionDTO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "signerPublicKey" in value;
    isInstance = isInstance && "version" in value;
    isInstance = isInstance && "network" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "linkedPublicKey" in value;
    isInstance = isInstance && "linkAction" in value;

    return isInstance;
}

export function EmbeddedAccountKeyLinkTransactionDTOFromJSON(json: any): EmbeddedAccountKeyLinkTransactionDTO {
    return EmbeddedAccountKeyLinkTransactionDTOFromJSONTyped(json, false);
}

export function EmbeddedAccountKeyLinkTransactionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmbeddedAccountKeyLinkTransactionDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'signerPublicKey': json['signerPublicKey'],
        'version': json['version'],
        'network': NetworkTypeEnumFromJSON(json['network']),
        'type': json['type'],
        'linkedPublicKey': json['linkedPublicKey'],
        'linkAction': LinkActionEnumFromJSON(json['linkAction']),
    };
}

export function EmbeddedAccountKeyLinkTransactionDTOToJSON(value?: EmbeddedAccountKeyLinkTransactionDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'signerPublicKey': value.signerPublicKey,
        'version': value.version,
        'network': NetworkTypeEnumToJSON(value.network),
        'type': value.type,
        'linkedPublicKey': value.linkedPublicKey,
        'linkAction': LinkActionEnumToJSON(value.linkAction),
    };
}

