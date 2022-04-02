import { Processor } from "processor";
import { RegisterNames } from "register";

class Emulator {
    private _processor: Processor;
    private _state: HTMLDivElement;
    private _instructions: HTMLDivElement;
    constructor() {
        this._processor = new Processor(4096);
        this._processor.load_program([
            0x00E0, 0xA055, 0xD005, 
            0xA05A, 0x6105, 0xD105, 
            0xA05F, 0x610A, 0xD105, 
            0xA082, 0x610F, 0xD105
        ]);
        this._state = document.getElementById("state") as HTMLDivElement;
        this._instructions = document.getElementById("instruction") as HTMLDivElement;
        this.display_state();
        this.display_instructions();
    }

    private display_state() {
        const registers = Object.keys(this._processor.registers);
        this._state.innerText = "";
        registers.forEach(register_name => {
            this._state.innerText += ` ${this._processor.registers[register_name].name}: ${this._processor.registers[register_name].value} `;
        });
    }

    private display_instructions() {
        const system_memory = this._processor.system_memory;
        const PC = this._processor.registers[RegisterNames.PC].value;
        this._instructions.innerText = "";
        for(let index = 0x200; index < 0x20C; index++) {
            this._instructions.innerHTML += `0x${system_memory[index].toString(16)}<br>`;
        }
    }

    public step() {
        this._processor.step();
        this.display_state();
        this.display_instructions();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const emulator = new Emulator();
    const next_button = document.getElementById("next-button") as HTMLButtonElement;
    next_button.addEventListener("click", () => {
        emulator.step();
    })
});