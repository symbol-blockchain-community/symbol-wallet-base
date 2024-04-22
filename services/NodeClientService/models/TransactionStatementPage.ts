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
import type { Pagination } from './Pagination.js';
import {
    PaginationFromJSON,
    PaginationFromJSONTyped,
    PaginationToJSON,
} from './Pagination.js';
import type { TransactionStatementInfoDTO } from './TransactionStatementInfoDTO.js';
import {
    TransactionStatementInfoDTOFromJSON,
    TransactionStatementInfoDTOFromJSONTyped,
    TransactionStatementInfoDTOToJSON,
} from './TransactionStatementInfoDTO.js';

/**
 * 
 * @export
 * @interface TransactionStatementPage
 */
export interface TransactionStatementPage {
    /**
     * Array of transaction statements.
     * @type {Array<TransactionStatementInfoDTO>}
     * @memberof TransactionStatementPage
     */
    data: Array<TransactionStatementInfoDTO>;
    /**
     * 
     * @type {Pagination}
     * @memberof TransactionStatementPage
     */
    pagination: Pagination;
}

/**
 * Check if a given object implements the TransactionStatementPage interface.
 */
export function instanceOfTransactionStatementPage(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "pagination" in value;

    return isInstance;
}

export function TransactionStatementPageFromJSON(json: any): TransactionStatementPage {
    return TransactionStatementPageFromJSONTyped(json, false);
}

export function TransactionStatementPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionStatementPage {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(TransactionStatementInfoDTOFromJSON)),
        'pagination': PaginationFromJSON(json['pagination']),
    };
}

export function TransactionStatementPageToJSON(value?: TransactionStatementPage | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': ((value.data as Array<any>).map(TransactionStatementInfoDTOToJSON)),
        'pagination': PaginationToJSON(value.pagination),
    };
}

