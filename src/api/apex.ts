import {BasAPI} from './base-api';
import * as http from 'http';
import {IToken, IRequest, IWebAuth} from '../interfaces';
import * as storage from '../storage';
import {DEFAULT_API_VERSION} from '../constants';
export class Apex extends BasAPI {
  private static apiVersion:string = storage.getWebConfig().apiVersion || DEFAULT_API_VERSION;
  static query(soql:string) {
    return this.requestData({
      path:`/services/data/${ this.apiVersion}/query`,
      params: {
        q:soql
      }
    });
  }

  static retrieve(objectName:string, id:string, fields) {
    return this.requestData({
      path: `/services/data/${this.apiVersion}/sobjects/${ objectName }/${id}`,
      params: fields ? {fields: (typeof fields === 'string' ? fields : fields.join(','))} : undefined
    });
  }

  static getPickListValues(objectName:string) {
    return this.requestData({
      path: `/services/data/${ this.apiVersion }/sobjects/${ objectName }/describe`
    });
  }
  static create(objectName, data) {
    return this.requestData({
      method: 'POST',
      contentType: 'application/json',
      path: `/services/data/${this.apiVersion }/sobjects/${objectName}/`,
      data: data
    });
  }
  static update(objectName:string, data) {
    let id = data.Id || data.id, fields = JSON.parse(JSON.stringify(data));
    delete fields.attributes;
    delete fields.Id;
    delete fields.id;
    return this.requestData({
      method: 'POST',
      contentType: 'application/json',
      path: `/services/data/${this.apiVersion}/sobjects/${objectName}/${id}`,
      params: {'_HttpMethod': 'PATCH'},
      data: fields
    });
  }
  static delRecord(objectName:string, id:string) {
    return this.requestData({
      method: 'DELETE',
      path: `/services/data/${this.apiVersion}/sobjects/${objectName}/${id}`
    });
  }

  static upsert(objectName:string, externalIdField:string, externalId:string, data) {
    return this.requestData({
      method: 'PATCH',
      contentType: 'application/json',
      path: `/services/data/${this.apiVersion}/sobjects/${objectName}/${externalIdField}/${externalId}`,
      data: data
    });
  }

  static restapi(pathOrParams:any) {
    let obj;
    if (typeof pathOrParams === "string") {
      obj = {path: pathOrParams, method: "GET"};
    } 
    else {
      obj = pathOrParams;
      if (obj.path.charAt(0) !== "/") {
        obj.path = "/" + obj.path;
      }
      if (obj.path.substr(0, 18) !== "/services/apexrest") {
        obj.path = "/services/apexrest" + obj.path;
      }
    }
    if (!obj.contentType) {
      obj.contentType = (obj.method == "DELETE" || obj.method == "GET" ? null : "application/json");
    }
    return this.requestData(obj);
  }
  static versions() {
    return this.requestData({path: '/services/data/'});
  }
  static resources() {
    return this.requestData({path: `/services/data/${this.apiVersion}`});
  }
  static describeGlobal() {
    return this.requestData({path: `/services/data/${this.apiVersion}/sobjects`});
  }
  static metadata(objectName:string) {
    return this.requestData({path: `/services/data/${this.apiVersion }/sobjects/${objectName}`});
  }
  static describe(objectName) {
    return this.requestData({path: `/services/data/${this.apiVersion}/sobjects/${objectName}/describe`});
  }
  static describeLayout(objectName, recordTypeId) {
    recordTypeId = recordTypeId || "";
    return this.requestData({
      path: `/services/data/${this.apiVersion}/sobjects/${objectName}/describe/layouts/${recordTypeId}`
    });
  }
}