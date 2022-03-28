import { expect } from "chai";
import { Instructions } from "instruction";
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
    it("Processor returns error when attempting to decode invalid instructions", () => {
        const processor = new Processor(4096);
        expect(processor.decode_instruction(0x8009).error).is.not.equal(undefined);
    });
    it("Processor returns no error when attempting to decode valid instructions", () => {
        const processor = new Processor(4096);
        expect(processor.decode_instruction(Instructions.NOP).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.CLS).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.RET).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.GOTO).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.CALL).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.SKPIM).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.SKPNIM).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.SKPEQ).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.ASHEX).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.ADD).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.COPY).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.OR).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.ADD).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.XOR).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.ADDF).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.SUBY).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.SHR).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.SUBX).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.SHL).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.SKPNEQ).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.SIP).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.GOTOV).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.RBAND).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.SHOW).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.SKPKEQ).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.SKPKNEQ).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.STOP).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.TIME).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.INHEX).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.STIME).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.SPITCH).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.STONE).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.ADDMP).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.DSPDIG).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.DSPCHR).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.DEQ).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.STORE).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.LOAD).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.SEND).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.RECV).error).is.equal(undefined);
        expect(processor.decode_instruction(Instructions.SBAUD).error).is.equal(undefined);
    });
})

describe("Instructions", () => {
    it(`GOTO: 0x${Instructions.GOTO.toString(16)}, moves the PC to the desired location`, () => {
        let processor = new Processor(4096);
        processor.load_program([0x1016]);
        processor.decode_instruction(processor.fetch_instruction());
        expect(processor.registers[RegisterNames.PC].value).is.equal(0x16);
    });
    it(`CALL: 0x${Instructions.CALL.toString(16)}, saves the PC to stack before moving it to the desired location`, () => {
        let processor = new Processor(4096);
        processor.load_program([0x2204, 0x0000, 0x00EE]);
        processor.decode_instruction(processor.fetch_instruction());
        expect(processor.system_memory[0x0]).is.equal(0x2);
        expect(processor.system_memory[0x1]).is.equal(0x2);
        expect(processor.registers[RegisterNames.SP].value).is.equal(0x2);
        expect(processor.registers[RegisterNames.PC].value).is.equal(0x204);
    });
    it(`RET: 0x${Instructions.RET.toString(16)}, restores the PC from the stack`, () => {
        let processor = new Processor(4096);
        processor.load_program([0x2204, 0x0000, 0x00EE]);
        processor.decode_instruction(processor.fetch_instruction());
        expect(processor.registers[RegisterNames.PC].value).is.equal(0x204);
        processor.decode_instruction(processor.fetch_instruction());
        expect(processor.registers[RegisterNames.PC].value).is.equal(0x202);
    });
});