import * as http from 'http';
import { IRequest } from '../interfaces';
export declare class BasAPI {
    private static refreshToken();
    protected static requestData(value: IRequest): Promise<http.HttpResponse>;
}
