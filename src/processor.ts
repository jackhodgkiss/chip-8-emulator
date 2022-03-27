import { create_memory } from "memory";
import { Register, RegisterNames } from "register";

export class Processor {
    private _system_memory: Uint8Array;
    private _registers!: { [name: string]: Register };
    constructor(memory_size: number) {
        this._system_memory = create_memory(memory_size);
        this.initialise_register();
    }

    private initialise_register(): void {
        this._registers = Object.keys(RegisterNames).reduce((registers, name, _) => {
            registers[name] = new Register(RegisterNames[name as RegisterNames], 0x0);
            return registers;
        }, { } as { [name: string]: Register });
    }

    public get system_memory(): Uint8Array {
        return this._system_memory;
    }

    public get registers(): { [name: string]: Register } {
        return this._registers;
    }
}