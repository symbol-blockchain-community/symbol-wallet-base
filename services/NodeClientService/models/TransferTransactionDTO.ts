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
import type { NetworkTypeEnum } from './NetworkTypeEnum.js';
import {
    NetworkTypeEnumFromJSON,
    NetworkTypeEnumFromJSONTyped,
    NetworkTypeEnumToJSON,
} from './NetworkTypeEnum.js';
import type { UnresolvedMosaic } from './UnresolvedMosaic.js';
import {
    UnresolvedMosaicFromJSON,
    UnresolvedMosaicFromJSONTyped,
    UnresolvedMosaicToJSON,
} from './UnresolvedMosaic.js';

/**
 * Transaction to transfer mosaics and a message to another account.
 * @export
 * @interface TransferTransactionDTO
 */
export interface TransferTransactionDTO {
    /**
     * A number that allows uint 32 values.
     * @type {number}
     * @memberof TransferTransactionDTO
     */
    size: number;
    /**
     * Entity's signature generated by the signer.
     * @type {string}
     * @memberof TransferTransactionDTO
     */
    signature: string;
    /**
     * Public key.
     * @type {string}
     * @memberof TransferTransactionDTO
     */
    signerPublicKey: string;
    /**
     * Entity version.
     * @type {number}
     * @memberof TransferTransactionDTO
     */
    version: number;
    /**
     * 
     * @type {NetworkTypeEnum}
     * @memberof TransferTransactionDTO
     */
    network: NetworkTypeEnum;
    /**
     * 
     * @type {number}
     * @memberof TransferTransactionDTO
     */
    type: number;
    /**
     * Absolute amount. An amount of 123456789 (absolute) for a mosaic with divisibility 6 means 123.456789 (relative).
     * @type {string}
     * @memberof TransferTransactionDTO
     */
    maxFee: string;
    /**
     * Duration expressed in number of blocks.
     * @type {string}
     * @memberof TransferTransactionDTO
     */
    deadline: string;
    /**
     * Address expressed in Base32 format. If the bit 0 of byte 0 is not set (like in 0x90), then it is a
     * regular address. Example: TAOXUJOTTW3W5XTBQMQEX3SQNA6MCUVGXLXR3TA. 
     * Otherwise (e.g. 0x91) it represents a namespace id which starts at byte 1. Example: THBIMC3THGH5RUYAAAAAAAAAAAAAAAAAAAAAAAA
     * 
     * @type {string}
     * @memberof TransferTransactionDTO
     */
    recipientAddress: string;
    /**
     * Array of mosaics sent to the recipient.
     * 
     * @type {Array<UnresolvedMosaic>}
     * @memberof TransferTransactionDTO
     */
    mosaics: Array<UnresolvedMosaic>;
    /**
     * Transfer transaction message
     * @type {string}
     * @memberof TransferTransactionDTO
     */
    message?: string;
}

/**
 * Check if a given object implements the TransferTransactionDTO interface.
 */
export function instanceOfTransferTransactionDTO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "size" in value;
    isInstance = isInstance && "signature" in value;
    isInstance = isInstance && "signerPublicKey" in value;
    isInstance = isInstance && "version" in value;
    isInstance = isInstance && "network" in value;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "maxFee" in value;
    isInstance = isInstance && "deadline" in value;
    isInstance = isInstance && "recipientAddress" in value;
    isInstance = isInstance && "mosaics" in value;

    return isInstance;
}

export function TransferTransactionDTOFromJSON(json: any): TransferTransactionDTO {
    return TransferTransactionDTOFromJSONTyped(json, false);
}

export function TransferTransactionDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransferTransactionDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'size': json['size'],
        'signature': json['signature'],
        'signerPublicKey': json['signerPublicKey'],
        'version': json['version'],
        'network': NetworkTypeEnumFromJSON(json['network']),
        'type': json['type'],
        'maxFee': json['maxFee'],
        'deadline': json['deadline'],
        'recipientAddress': json['recipientAddress'],
        'mosaics': ((json['mosaics'] as Array<any>).map(UnresolvedMosaicFromJSON)),
        'message': !exists(json, 'message') ? undefined : json['message'],
    };
}

export function TransferTransactionDTOToJSON(value?: TransferTransactionDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'size': value.size,
        'signature': value.signature,
        'signerPublicKey': value.signerPublicKey,
        'version': value.version,
        'network': NetworkTypeEnumToJSON(value.network),
        'type': value.type,
        'maxFee': value.maxFee,
        'deadline': value.deadline,
        'recipientAddress': value.recipientAddress,
        'mosaics': ((value.mosaics as Array<any>).map(UnresolvedMosaicToJSON)),
        'message': value.message,
    };
}

