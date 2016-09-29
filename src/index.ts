import SingleInit from 'single-init';
import { AmqpAdapter } from './amqp-adapter';
import { IAdapter } from './interfaces';

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
        if (config.adapter === 'amqp') {
            this.adapterSingleInit = new SingleInit((done) => {
                let adapter = new AmqpAdapter();
                adapter.init(<any>config).then(function () {
                    done(null, adapter);
                }, done);
            });
        }
    }

    public async on(method: string, callback: (params: any, reply: (data: any) => void) => void) {
        let adapter = await this.adapterSingleInit.get();
        return adapter.on(method, callback);
    }

    public async call(method: string, params?: any): Promise<any> {
        let adapter = await this.adapterSingleInit.get()
        return await adapter.call(method, params);
    }

}
