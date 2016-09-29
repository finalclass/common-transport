import {factory as rpcFactory, IRpc} from 'amqp-rpc';
import {IAdapter} from './interfaces'

export interface IAmqpAdapterConfig {
    host: string;
    port: number;
    user: string;
    pass: string;
}

export class AmqpAdapter implements IAdapter {

    private rpc:IRpc;

    constructor() {

    }

    private initDefaults(config:IAmqpAdapterConfig):IAmqpAdapterConfig {
        var cfg:any = config || {};
        return {
            host: cfg.host || 'localhost',
            port: cfg.port || 5672,
            user: cfg.user || 'guest',
            pass: cfg.pass || 'guest'
        };
    }

    public init({amqp}:{amqp:IAmqpAdapterConfig}):Promise<void> {
        amqp = this.initDefaults(amqp);
        this.rpc = rpcFactory({
            url: `amqp://${amqp.user}:${amqp.pass}@${amqp.host}:${amqp.port}`
        });
        return Promise.resolve();
    }

    public on(method:string, callback: (params:any[], reply:(data:any)=>void)=>void) {
        this.rpc.on(method, callback);
    }

    public call(method:string, params:any):Promise<any> {
        return new Promise((resolve, reject) => {
            this.rpc.call(method, params, resolve);
        });
    }

}