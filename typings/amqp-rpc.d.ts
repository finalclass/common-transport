declare module 'amqp-rpc' {
    export interface IRpc {
        on(msg:string, callback:(params:any, done:(response:any)=>void)=>void, context?:any, options?:any);
        call(msg:string, data:any, callback:(msg:any)=>void, context?:any, options?:any);
        disconnect():void;
    }
    export function factory(options:any):IRpc;
}