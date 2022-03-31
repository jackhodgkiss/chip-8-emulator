import { expect } from "chai";
import { create_memory, font_data } from "memory";

describe("Memory", () => {
    it("Array constructed has reserved space for 4096 elements", () => {
        const system_memory: Uint8Array = create_memory(4096);
        expect(system_memory.length).is.equal(4096);
    });
    it("Memory initialised with font data at 0x50", () => {
        const system_memory: Uint8Array = create_memory(4096);
        for(let index = 0; index < font_data.length; index++) {
            expect(system_memory[index + 0x50]).is.equal(font_data[index]);
        }
    });
});