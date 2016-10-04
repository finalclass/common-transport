import SingleInit from 'single-init';
import { AmqpAdapter } from './amqp-adapter';
import { IAdapter } from './interfaces';
import * as debugFactory from 'debug';

const log = debugFactory('common-transport:log');
const logError = debugFactory('common-transport:error');

export interface ICommonTransportConfig {
    adapter: 'amqp';
    amqp: {
        host: string;
        port: number;
        user: string;
        pass: string;
    }
}

export default class CommonTransport {

    private adapterSingleInit: SingleInit<IAdapter>;

    constructor(private config: ICommonTransportConfig) {
        log('constructor');
        if (config.adapter === 'amqp') {
            log('initializing amqp adapter single init');
            this.adapterSingleInit = new SingleInit((done) => {
                log('creating new AmqpAdapter instance');
                let adapter = new AmqpAdapter();
                adapter.init(<any>config).then(function () {
                    done(null, adapter);
                    log('Instantiating AmqpAdapter success');
                }, function (err) {
                    logError('Instantiating AmqpAdapter failed', (err || {}).stack);
                });
            });
        }
    }

    public async on(method: string, callback: (params: any, reply: (data: any) => void) => void) {
        let adapter = await this.adapterSingleInit.get();
        adapter.on(method, callback);
        log('Setting handler for ' + method);
    }

    public async call(method: string, params?: any): Promise<any> {
        let adapter = await this.adapterSingleInit.get()
        let result = await adapter.call(method, params);
        log('Calling method + ' + method);
        return result;
    }

    public async disconnect() : Promise<void> {
        log('Disconnecting');
        if (this.adapterSingleInit.state === 'cold') {
            log('never connected, returning');
            return;
        } else {
            let adapter = await this.adapterSingleInit.get();
            adapter.disconnect();
            log('disconnected');
        }
    }

}
