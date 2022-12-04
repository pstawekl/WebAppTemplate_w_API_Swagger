/* tslint:disable */
/* eslint-disable */
/**
 * Project API
 * API for config.json in project
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ModelObject
 */
export interface ModelObject {
    /**
     * none
     * @type {string}
     * @memberof ModelObject
     */
    id: string;
    /**
     * none
     * @type {string}
     * @memberof ModelObject
     */
    description: string;
    /**
     * none
     * @type {string}
     * @memberof ModelObject
     */
    value: string;
}

export function ModelObjectFromJSON(json: any): ModelObject {
    return ModelObjectFromJSONTyped(json, false);
}

export function ModelObjectFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelObject {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'description': json['description'],
        'value': json['value'],
    };
}

export function ModelObjectToJSON(value?: ModelObject | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'description': value.description,
        'value': value.value,
    };
}

