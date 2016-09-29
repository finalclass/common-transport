CommonTransport
===============

Common interface for communication between services.

Righ now it only supports AMQP protocol.

Example:

```js

//server:
import {CommonTransport} from 'common-transport';

let transport = new CommonTransport({
    adapter: 'amqp',
    amqp: {
        host: 'localhost',
        port: 5672,
        user: 'guest',
        pass: 'guest'
    }
});

transport.on('products.get' function (params, reply) {
    reply([
        {
            id: 'product-1',
            //....
        }
    ]);
});

//client:
import {CommonTransport} from 'common-transport';

let transport = new CommonTransport({
    adapter: 'amqp',
    amqp: {
        host: 'localhost',
        port: 5672,
        user: 'guest',
        pass: 'guest'
    }
});

(async function () {
    try {
        let products = await transport.call('products.get');
    } catch (err) {
        //an error occured
    }
}());
```