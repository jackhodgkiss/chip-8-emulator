export class Display {
    private _rows: number = 32;
    private _columns: number = 64;
    private _pixels: Array<Array<HTMLDivElement>> = [];
    constructor() {
        if(typeof window != "undefined") {
            this.initialise_display();
        }
    }
    
    private initialise_display(): void {
        const emulator_screen: HTMLDivElement = document.getElementById("emulator-screen") as HTMLDivElement;
        for(let row = 0; row < this._rows; row++) {
            const pixel_column: Array<HTMLDivElement> = [];
            for(let column = 0; column < this._columns; column++) {
                const pixel: HTMLDivElement = document.createElement("div");
                pixel.classList.add("pixel");
                if(Math.random() <= 0.5) { pixel.classList.add("high"); }
                emulator_screen.appendChild(pixel);
                pixel_column.push(pixel);
            }
            this._pixels.push(pixel_column);
        }
    }

    public toggle_pixel(abscissa: number, ordinate: number): boolean {
        const is_high = this._pixels[ordinate][abscissa].classList.contains("high");
        if(is_high) {
            this._pixels[ordinate][abscissa].classList.remove("high");
        } else {
            this._pixels[ordinate][abscissa].classList.add("high");
        }
        return is_high;
    }

    public clear(): void {
        for (const column of this._pixels) {
            column.forEach(pixel => {
                pixel.classList.remove("high");
            });
        }
    }

    public get pixels(): Array<Array<HTMLDivElement>> {
        return this._pixels;
    }
}