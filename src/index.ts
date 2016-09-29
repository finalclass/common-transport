import * as SingleInit from 'single-init';

export interface ICommonTransportConfig {
    adapter:'amqp';
    amqp:{
        host:string;
        port:string;
        user:string;
        pass:string;
    };
}

export class CommonTransport {

    constructor(private config:ICommonTransportConfig) {

    }

    public on(method:string, params:any[], reply:(data:any)=>void) {

    }

    public call(method:string, ...params:any[]):Promise<any> {
        return new Promise((resolve, reject) => {

        });
    }

}
