import { Processor } from "processor";

class Emulator {
    private _processor: Processor;
    constructor() {
        this._processor = new Processor(4096);
        this._processor.load_program([
            0x00E0, 0xA055, 0xD005, 
            0xA05A, 0x6105, 0xD105, 
            0xA05F, 0x610A, 0xD105, 
            0xA082, 0x610F, 0xD105
        ]);
    }

    public step() {
        this._processor.step();
    }

}

document.addEventListener("DOMContentLoaded", () => {
    const emulator = new Emulator();
    const next_button = document.getElementById("next-button") as HTMLButtonElement;
    next_button.addEventListener("click", () => {
        emulator.step();
    })
});