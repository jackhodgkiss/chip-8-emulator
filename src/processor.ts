import { Instructions } from "instruction";
import { create_memory } from "memory";
import { Register, RegisterNames } from "register";

export type mask = { 
    first_nibble: number, second_nibble: number, 
    third_nibble: number, fourth_nibble: number, 
    first_byte: number, second_byte: number, 
    twelve_bits: number 
};

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

    public load_program(program: number []): void {
        this._registers[RegisterNames.PC].value = 0x0200;
        program.forEach((value, index, _) => {
            const high_bits: number = value >> 8;
            const low_bits: number = value & 0xFF;
            this._system_memory[0x200 + (index * 2)] = high_bits;
            this._system_memory[0x201 + (index * 2)] = low_bits; 
        });
    }

    public fetch_instruction(): number {
        let program_counter: number = this._registers[RegisterNames.PC].value;
        const high_bits: number = this._system_memory[program_counter++];
        const low_bits: number = this._system_memory[program_counter++];
        this._registers[RegisterNames.PC].value = program_counter;
        return high_bits << 8 | low_bits;
    }

    public mask_instruction(instruction: number): mask {
        const masked = {
            first_nibble: instruction & 0xF000,
            second_nibble: instruction & 0x0F00,
            third_nibble: instruction & 0x00F0,
            fourth_nibble: instruction & 0x000F,
            first_byte: instruction & 0xFF00,
            second_byte: instruction & 0x00FF,
            twelve_bits: instruction & 0x0FFF
        }
        return masked
    }

    public decode_instruction(instruction: number): {error?: string} {
        let success: boolean = true;
        const masked: mask = this.mask_instruction(instruction);
        switch(masked.first_nibble) {
            case 0x0000: {
                switch(masked.second_byte) {
                    case Instructions.NOP: {
                        break;
                    }
                    case Instructions.CLS: {
                        break;
                    }
                    case Instructions.RET: {
                        break;
                    }
                    default: {
                        success = false;
                        break;
                    }
                }
                break;
            }
            default: {
                success = false;
                break;
            }
        }
        return success ? {error: undefined} : {error: `${instruction} could not be decoded`}
    }

    public get system_memory(): Uint8Array {
        return this._system_memory;
    }

    public get registers(): { [name: string]: Register } {
        return this._registers;
    }

    public get state(): string {
        let result: string = `Chip-8 Processor\nSystem Memory: ${this._system_memory.length} Bytes\nRegisters:\n`;
        const registers = Object.keys(this._registers);
        registers.forEach(register_name => {
            result += `${this._registers[register_name].state}\n`;
        });
        return result;
    }
}