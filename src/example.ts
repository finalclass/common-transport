import CommonTransport from './index';
import * as cluster from 'cluster';

let ct = new CommonTransport({
    adapter: 'amqp',
    amqp: {
        host: 'localhost',
        port: 5672,
        user: 'guest',
        pass: 'guest'
    }
});

if (cluster.isMaster) {
    console.log('Im a server');
    ct.on('get number', function (params, reply) {
        console.log('on get number');
        reply(5);
    });
    cluster.fork();
} else {
    console.log('Im a client');
    ct.call('get number', 2).then(function (result) {
        console.log('Got number: ', result);
    });
}