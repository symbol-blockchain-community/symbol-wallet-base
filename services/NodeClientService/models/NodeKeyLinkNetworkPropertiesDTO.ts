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
 * @interface NodeKeyLinkNetworkPropertiesDTO
 */
export interface NodeKeyLinkNetworkPropertiesDTO {
    /**
     * to trigger plugin load
     * @type {string}
     * @memberof NodeKeyLinkNetworkPropertiesDTO
     */
    dummy?: string;
}

/**
 * Check if a given object implements the NodeKeyLinkNetworkPropertiesDTO interface.
 */
export function instanceOfNodeKeyLinkNetworkPropertiesDTO(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function NodeKeyLinkNetworkPropertiesDTOFromJSON(json: any): NodeKeyLinkNetworkPropertiesDTO {
    return NodeKeyLinkNetworkPropertiesDTOFromJSONTyped(json, false);
}

export function NodeKeyLinkNetworkPropertiesDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): NodeKeyLinkNetworkPropertiesDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'dummy': !exists(json, 'dummy') ? undefined : json['dummy'],
    };
}

export function NodeKeyLinkNetworkPropertiesDTOToJSON(value?: NodeKeyLinkNetworkPropertiesDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'dummy': value.dummy,
    };
}

