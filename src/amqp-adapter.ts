import {factory as rpcFactory, IRpc} from 'amqp-rpc';
import * as debugFactory from 'debug';

import {IAdapter} from './interfaces'

const log = debugFactory('common-transport:log');
const logError = debugFactory('common-transport:error');


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
        log(`amqp://${amqp.user}:${amqp.pass}@${amqp.host}:${amqp.port}`);
        this.rpc = rpcFactory({
            url: `amqp://${amqp.user}:${amqp.pass}@${amqp.host}:${amqp.port}`,
        });
        return Promise.resolve();
    }

    public on(method:string, callback: (params:any[], reply:(data:any)=>void)=>void) {
        this.rpc.on(method, callback, null);
    }

    public call(method:string, params:any = null):Promise<any> {
        return new Promise((resolve, reject) => {
            this.rpc.call(method, params, resolve, null, {autoDeleteCallback: true});
        });
    }

    public disconnect():Promise<any> {
        this.rpc.disconnect();
        return Promise.resolve();
    }

}