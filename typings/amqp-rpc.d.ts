declare module 'amqp-rpc' {
    export interface IRpc {
        on(msg:string, callback:(params:any, done:(response:any)=>void)=>void);
        call(msg:string, data:any, callback:(msg:any)=>void);
    }
    export function factory(options:any):IRpc;
}