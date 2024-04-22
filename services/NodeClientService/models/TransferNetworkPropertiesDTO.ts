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
/**
 * 
 * @export
 * @interface TransferNetworkPropertiesDTO
 */
export interface TransferNetworkPropertiesDTO {
    /**
     * Maximum transaction message size.
     * @type {string}
     * @memberof TransferNetworkPropertiesDTO
     */
    maxMessageSize?: string;
}

/**
 * Check if a given object implements the TransferNetworkPropertiesDTO interface.
 */
export function instanceOfTransferNetworkPropertiesDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TransferNetworkPropertiesDTOFromJSON(json: any): TransferNetworkPropertiesDTO {
    return TransferNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function TransferNetworkPropertiesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransferNetworkPropertiesDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'maxMessageSize': !exists(json, 'maxMessageSize') ? undefined : json['maxMessageSize'],
    };
}

export function TransferNetworkPropertiesDTOToJSON(value?: TransferNetworkPropertiesDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'maxMessageSize': value.maxMessageSize,
    };
}

