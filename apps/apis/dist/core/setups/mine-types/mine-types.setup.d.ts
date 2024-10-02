type TypeMap = {
    [key: string]: string[];
};
export default class Mime {
    #private;
    constructor(...args: TypeMap[]);
    define(typeMap: TypeMap, force?: boolean): this;
    getType(path: string): string;
    getExtension(type: string): string;
    getAllExtensions(type: string): Set<string>;
    _freeze(): this;
    _getTestState(): {
        types: Map<string, string>;
        extensions: Map<string, string>;
    };
}
export {};
