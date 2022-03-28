import { expect } from "chai";
import { mask, Processor } from "processor";
import { Register, RegisterNames } from "register";

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
        expect(processor.registers[RegisterNames.PC].value).is.equal(0x0);
        processor.load_program([0x00E0, 0xF000]);
        expect(processor.registers[RegisterNames.PC].value).is.equal(0x0200);
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
    it("Processor can fetch instruction from memory", () => {
        const processor = new Processor(4096);
        processor.load_program([0x00E0, 0xF000]);
        expect(processor.fetch_instruction()).is.equal(0x00E0);
        expect(processor.fetch_instruction()).is.equal(0xF000);
    });
    it("Processor increments PC by two, after fetching instruction", () => {
        const processor = new Processor(4096);
        processor.load_program([0x00E0, 0xF000]);
        expect(processor.registers[RegisterNames.PC].value).is.equal(0x0200);
        processor.fetch_instruction();
        expect(processor.registers[RegisterNames.PC].value).is.equal(0x0202);
        processor.fetch_instruction();
        expect(processor.registers[RegisterNames.PC].value).is.equal(0x0204);
    });
    it("Processor correctly masks an instruction into its various components", () => {
        const processor = new Processor(4096);
        const masked: mask = processor.mask_instruction(0xFED4);
        expect(masked.first_nibble).is.equal(0xF000);
        expect(masked.second_nibble).is.equal(0xE00);
        expect(masked.third_nibble).is.equal(0x00D0);
        expect(masked.fourth_nibble).is.equal(0x0004);
        expect(masked.first_byte).is.equal(0xFE00);
        expect(masked.second_byte).is.equal(0x00D4);
        expect(masked.twelve_bits).is.equal(0x0ED4);
    });
})