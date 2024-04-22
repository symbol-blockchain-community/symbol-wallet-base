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
 * @interface UnlockedAccountDTO
 */
export interface UnlockedAccountDTO {
    /**
     * 
     * @type {Array<string>}
     * @memberof UnlockedAccountDTO
     */
    unlockedAccount: Array<string>;
}

/**
 * Check if a given object implements the UnlockedAccountDTO interface.
 */
export function instanceOfUnlockedAccountDTO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "unlockedAccount" in value;

    return isInstance;
}

export function UnlockedAccountDTOFromJSON(json: any): UnlockedAccountDTO {
    return UnlockedAccountDTOFromJSONTyped(json, false);
}

export function UnlockedAccountDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): UnlockedAccountDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'unlockedAccount': json['unlockedAccount'],
    };
}

export function UnlockedAccountDTOToJSON(value?: UnlockedAccountDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'unlockedAccount': value.unlockedAccount,
    };
}

