import { expect } from "chai";
import { Processor } from "processor";
import { Register } from "register";

describe("Processor", () => {
    it("Processor has 4KB of available system memory", () => {
        const processor = new Processor(4096);
        expect(processor.system_memory.length).is.equal(4096);
    });
    it("Processor has all 21 registers available and initialised", () => {
        const processor = new Processor(4096);
        const registers = Object.entries(processor.registers);
        expect(registers.length).is.equal(21);
        registers.forEach(([key, register]: [string, Register]) => {
            expect(register.name.toString()).is.equal(key);
            expect(register.value).is.equal(0);
        });
    });
    it("Processor sets PC to 0x200 after loading program to memory", () => {
        const processor = new Processor(4096);
        expect(processor.registers['PC'].value).is.equal(0x0);
        processor.load_program([0x00E0, 0xF000]);
        expect(processor.registers['PC'].value).is.equal(0x0200);
    });
    it("Processor loads program into system memory starting at 0x0200", () => {
        const processor = new Processor(4096);
        processor.load_program([0x00E0, 0xF000]);
        const system_memory = processor.system_memory;
        expect(system_memory[0x0200]).is.equal(0x0);
        expect(system_memory[0x0200 + 0x1]).is.equal(0xE0);
        expect(system_memory[0x0200 + 0x2]).is.equal(0xF0);
        expect(system_memory[0x0200 + 0x3]).is.equal(0x0);
    });
})