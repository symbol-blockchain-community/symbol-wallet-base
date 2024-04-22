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
 * @interface CosignatureDTO
 */
export interface CosignatureDTO {
    /**
     * Entity's signature generated by the signer.
     * @type {string}
     * @memberof CosignatureDTO
     */
    signature: string;
    /**
     * Cosignature version.
     * @type {string}
     * @memberof CosignatureDTO
     */
    version: string;
    /**
     * Public key.
     * @type {string}
     * @memberof CosignatureDTO
     */
    signerPublicKey: string;
}

/**
 * Check if a given object implements the CosignatureDTO interface.
 */
export function instanceOfCosignatureDTO(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "signature" in value;
    isInstance = isInstance && "version" in value;
    isInstance = isInstance && "signerPublicKey" in value;

    return isInstance;
}

export function CosignatureDTOFromJSON(json: any): CosignatureDTO {
    return CosignatureDTOFromJSONTyped(json, false);
}

export function CosignatureDTOFromJSONTyped(json: any, ignoreDiscriminator: boolean): CosignatureDTO {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'signature': json['signature'],
        'version': json['version'],
        'signerPublicKey': json['signerPublicKey'],
    };
}

export function CosignatureDTOToJSON(value?: CosignatureDTO | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'signature': value.signature,
        'version': value.version,
        'signerPublicKey': value.signerPublicKey,
    };
}

