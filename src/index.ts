class Emulator {
    _rows: number = 32;
    _columns: number = 64;
    _display: Array<Array<HTMLDivElement>> = [];
    constructor() {
        this.initialise_display();
    }

    private initialise_display(): void {
        const emulator_screen: HTMLDivElement = document.getElementById("emulator-screen") as HTMLDivElement;
        for(let column = 0; column < this._columns; column++) {
            const pixel_column: Array<HTMLDivElement> = [];
            for(let row = 0; row < this._rows; row++) {
                const pixel: HTMLDivElement = document.createElement("div");
                pixel.classList.add("pixel");
                if(Math.random() <= 0.5) { pixel.classList.add("high"); }
                emulator_screen.appendChild(pixel);
                pixel_column.push(pixel);
            }
            this._display.push(pixel_column);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const emulator = new Emulator();
})