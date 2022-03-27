export class Register {
    private _name: RegisterNames;
    private _value!: number;
    private _is_sixteen_bit: boolean;
    constructor(name: RegisterNames, value: number) {
        this._name = name;
        this._is_sixteen_bit = [
            RegisterNames.PC, 
            RegisterNames.SP, 
            RegisterNames.I
        ].includes(name);
        this.value = value;
    }

    public get name(): RegisterNames {
        return this._name;
    }

    public get value(): number {
        return this._value;
    }

    public set value(value: number) {
        this._value = value & (this._is_sixteen_bit ? 0xFFFF : 0xFFF);
    }

    public get state(): string {
        return `${this._name}: ${this._value}`
    }
}

export enum RegisterNames {
    V0 = 'V0',
    V1 = 'V1',
    V2 = 'V2',
    V3 = 'V3',
    V4 = 'V4',
    V5 = 'V5',
    V6 = 'V6',
    V7 = 'V7',
    V8 = 'V8',
    V9 = 'V9',
    VA = 'VA',
    VB = 'VB',
    VC = 'VC',
    VD = 'VD',
    VE = 'VE',
    VF = 'VF',
    PC = 'PC',
    SP = 'SP',
    ST = 'ST',
    DT = 'DT',
    I = 'I'
}