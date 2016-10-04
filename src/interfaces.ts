export interface IAdapter {
    init(config: any): Promise<void>;
    on(method: string, callback:(params: any[], reply: (data: any) => void)=>void);
    call(method: string, paramsArray: any[]):Promise<any>;
    disconnect():Promise<any>
}