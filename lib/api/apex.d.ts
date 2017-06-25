import { BasAPI } from './base-api';
import * as http from 'http';
export declare class Apex extends BasAPI {
    private static apiVersion;
    static query(soql: string): Promise<http.HttpResponse>;
    static retrieve(objectName: string, id: string, fields: any): Promise<http.HttpResponse>;
    static getPickListValues(objectName: string): Promise<http.HttpResponse>;
    static create(objectName: any, data: any): Promise<http.HttpResponse>;
    static update(objectName: string, data: any): Promise<http.HttpResponse>;
    static delRecord(objectName: string, id: string): Promise<http.HttpResponse>;
    static upsert(objectName: string, externalIdField: string, externalId: string, data: any): Promise<http.HttpResponse>;
    static restapi(pathOrParams: any): Promise<http.HttpResponse>;
    static versions(): Promise<http.HttpResponse>;
    static resources(): Promise<http.HttpResponse>;
    static describeGlobal(): Promise<http.HttpResponse>;
    static metadata(objectName: string): Promise<http.HttpResponse>;
    static describe(objectName: any): Promise<http.HttpResponse>;
    static describeLayout(objectName: any, recordTypeId: any): Promise<http.HttpResponse>;
}
