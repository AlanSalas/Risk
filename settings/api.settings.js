
import { Enviroment } from './environments.dev';


export default  class AppSettings {

    static API_URL =Enviroment.apiUrl;
    constructor() {
        this.ENDPOINT_GET_ACCES_TOKEN = Enviroment.apiUrl + Enviroment.endpointUnauthorized.login;
        this.API_URL = Enviroment.apiUrl;
        const obj = Enviroment.endpointUnauthorized;
        this.UNAUTHORIZED_PATHS = Object.keys(obj).map(function(k) {
            return obj[k];
          });
    }
}