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


import * as runtime from '../runtime.js';
import type {
  HashLockInfoDTO,
  HashLockPage,
  MerkleStateInfoDTO,
  ModelError,
  Order,
} from '../models/index.js';
import {
    HashLockInfoDTOFromJSON,
    HashLockInfoDTOToJSON,
    HashLockPageFromJSON,
    HashLockPageToJSON,
    MerkleStateInfoDTOFromJSON,
    MerkleStateInfoDTOToJSON,
    ModelErrorFromJSON,
    ModelErrorToJSON,
    OrderFromJSON,
    OrderToJSON,
} from '../models/index.js';

export interface GetHashLockRequest {
    hash: string;
}

export interface GetHashLockMerkleRequest {
    hash: string;
}

export interface SearchHashLockRequest {
    address?: string;
    pageSize?: number;
    pageNumber?: number;
    offset?: string;
    order?: Order;
}

/**
 * 
 */
export class HashLockRoutesApi extends runtime.BaseAPI {

    /**
     * Gets the hash lock for a given hash.
     * Get hash lock information
     */
    async getHashLockRaw(requestParameters: GetHashLockRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<HashLockInfoDTO>> {
        if (requestParameters.hash === null || requestParameters.hash === undefined) {
            throw new runtime.RequiredError('hash','Required parameter requestParameters.hash was null or undefined when calling getHashLock.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/lock/hash/{hash}`.replace(`{${"hash"}}`, encodeURIComponent(String(requestParameters.hash))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HashLockInfoDTOFromJSON(jsonValue));
    }

    /**
     * Gets the hash lock for a given hash.
     * Get hash lock information
     */
    async getHashLock(requestParameters: GetHashLockRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<HashLockInfoDTO> {
        const response = await this.getHashLockRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Gets the hash lock merkle for a given hash.
     * Get hash lock merkle information
     */
    async getHashLockMerkleRaw(requestParameters: GetHashLockMerkleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<MerkleStateInfoDTO>> {
        if (requestParameters.hash === null || requestParameters.hash === undefined) {
            throw new runtime.RequiredError('hash','Required parameter requestParameters.hash was null or undefined when calling getHashLockMerkle.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/lock/hash/{hash}/merkle`.replace(`{${"hash"}}`, encodeURIComponent(String(requestParameters.hash))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MerkleStateInfoDTOFromJSON(jsonValue));
    }

    /**
     * Gets the hash lock merkle for a given hash.
     * Get hash lock merkle information
     */
    async getHashLockMerkle(requestParameters: GetHashLockMerkleRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<MerkleStateInfoDTO> {
        const response = await this.getHashLockMerkleRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Returns an array of hash locks.
     * Search hash lock entries
     */
    async searchHashLockRaw(requestParameters: SearchHashLockRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<HashLockPage>> {
        const queryParameters: any = {};

        if (requestParameters.address !== undefined) {
            queryParameters['address'] = requestParameters.address;
        }

        if (requestParameters.pageSize !== undefined) {
            queryParameters['pageSize'] = requestParameters.pageSize;
        }

        if (requestParameters.pageNumber !== undefined) {
            queryParameters['pageNumber'] = requestParameters.pageNumber;
        }

        if (requestParameters.offset !== undefined) {
            queryParameters['offset'] = requestParameters.offset;
        }

        if (requestParameters.order !== undefined) {
            queryParameters['order'] = requestParameters.order;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/lock/hash`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => HashLockPageFromJSON(jsonValue));
    }

    /**
     * Returns an array of hash locks.
     * Search hash lock entries
     */
    async searchHashLock(requestParameters: SearchHashLockRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<HashLockPage> {
        const response = await this.searchHashLockRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
