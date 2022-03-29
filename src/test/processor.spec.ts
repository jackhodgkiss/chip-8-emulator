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
    it(`RET: 0x${Instructions.RET.toString(16)}, restores the PC from the stack`, () => {
        let processor = new Processor(4096);
        processor.load_program([0x2204, 0x0000, 0x00EE]);
        processor.decode_instruction(processor.fetch_instruction());
        expect(processor.registers[RegisterNames.PC].value).is.equal(0x204);
        processor.decode_instruction(processor.fetch_instruction());
        expect(processor.registers[RegisterNames.PC].value).is.equal(0x202);
    });
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
    it(`SKPIM: 0x${Instructions.SKPIM.toString(16)}, skip the next instruction if the specified register is equal to immediate value`, () => {
        let processor = new Processor(4096);
        processor.load_program([0x3103]);
        processor.registers[RegisterNames.V1].value = 3;
        processor.decode_instruction(processor.fetch_instruction());
        expect(processor.registers[RegisterNames.PC].value).is.equal(0x204);
    });
    it(`SKPNIM: 0x${Instructions.SKPNIM.toString(16)}, skip the next instruction if the specified register is not equal to immediate value`, () => {
        let processor = new Processor(4096);
        processor.load_program([0x4004]);
        processor.registers[RegisterNames.V0].value = 3;
        processor.decode_instruction(processor.fetch_instruction());
        expect(processor.registers[RegisterNames.PC].value).is.equal(0x204);
    });
    it(`SKPEQ: 0x${Instructions.SKPEQ.toString(16)}, skip the next instruction if the specified register is equal to the other register`, () => {
        let processor = new Processor(4096);
        processor.load_program([0x5010]);
        processor.registers[RegisterNames.V0].value = 3;
        processor.registers[RegisterNames.V1].value = 3;
        processor.decode_instruction(processor.fetch_instruction());
        expect(processor.registers[RegisterNames.PC].value).is.equal(0x204);
    });
    it(`ASHEX: 0x${Instructions.ASHEX.toString(16)}, assign hex value to specified register`);
    it(`ADD: 0x${Instructions.ADD.toString(16)}, add immediate value to the specified register`);
    it(`COPY: 0x${Instructions.COPY.toString(16)}, copy the value from one register to another`);
    it(`OR: 0x${Instructions.OR.toString(16)}, perform a logical OR operator against two registers`);
    it(`AND: 0x${Instructions.AND.toString(16)}, perform a logical AND operator against two registers`);
    it(`XOR: 0x${Instructions.XOR.toString(16)}, perform a logical XOR operator against two registers`);
    it(`ADDF: 0x${Instructions.ADDF.toString(16)}, add two register together and detect if overflow occurs`);
    it(`SUBY: 0x${Instructions.SUBY.toString(16)}, subtract two registers and detect if underflow occurs`);
    it(`SHR: 0x${Instructions.SHR.toString(16)}, right shift value detect if LSB was one`);
    it(`SUBX: 0x${Instructions.SUBX.toString(16)}, subtract two registers and detect if underflow occurs`);
    it(`SHL: 0x${Instructions.SHL.toString(16)}, left shift value detect if MSB was one`);
    it(`SKPNEQ: 0x${Instructions.SKPNEQ.toString(16)}, skip the next instruction if the specified register is not equal to the other register`, () => {
        let processor = new Processor(4096);
        processor.load_program([0x9010]);
        processor.registers[RegisterNames.V0].value = 2;
        processor.registers[RegisterNames.V1].value = 3;
        processor.decode_instruction(processor.fetch_instruction());
        expect(processor.registers[RegisterNames.PC].value).is.equal(0x204);
    });
    it(`SIP: 0x${Instructions.SIP.toString(16)}, set the index pointer to the immediate value`);
    it(`GOTOV: 0x${Instructions.GOTOV.toString(16)}, jump to the sum of the immediate address and V0`);
    it(`RBAND: 0x${Instructions.RBAND.toString(16)}, generate a random byte and perform a logical AND against it and the immediate value`);
    it(`SHOW: 0x${Instructions.SHOW.toString(16)}, update display memory with byte pattern at specified coordinates`);
    it(`SKPKEQ: 0x${Instructions.SKPKEQ.toString(16)}, skip next instruction if the key being pressed is equal to VX`);
    it(`SKPKNEQ: 0x${Instructions.SKPKNEQ.toString(16)}, skip next instruction if the key being pressed is not equal to VX`);
    it(`STOP: 0x${Instructions.STOP.toString(16)}, jump to Monitor`);
    it(`TIME: 0x${Instructions.TIME.toString(16)}, get the current timer value`);
    it(`INHEX: 0x${Instructions.INHEX.toString(16)}, wait for the input of a hex key code`);
    it(`STIME: 0x${Instructions.STIME.toString(16)}, initialise the time with the value in VX`);
    it(`SPITCH: 0x${Instructions.SPITCH.toString(16)}, set the pitch of the tone generator to VX`);
    it(`STONE: 0x${Instructions.STONE.toString(16)}, set the sound tone timer for twenty times VX`);
    it(`ADDMP: 0x${Instructions.GOTOV.toString(16)}, add VX to the memory pointer`);
    it(`DSPDIG: 0x${Instructions.DSPDIG.toString(16)}, set the memory pointer to the digit found in VX`);
    it(`DSPCHR: 0x${Instructions.DSPCHR.toString(16)}, set the memory pointer to the ASCII character found in VX`);
    it(`DEQ: 0x${Instructions.GOTOV.toString(16)}, store a three digit decimal equivalent of VX in memory`);
    it(`STORE: 0x${Instructions.STORE.toString(16)}, store the contents of the registers from V0 to VX in memory`);
    it(`LOAD: 0x${Instructions.LOAD.toString(16)}, load into registers V0 to VX contents from memory`);
    it(`SEND: 0x${Instructions.SEND.toString(16)}, send the contents of VX to RS485 port`);
    it(`RECV: 0x${Instructions.RECV.toString(16)}, wait to receive data from RS485 and store in VX`);
    it(`SBAUD: 0x${Instructions.STORE.toString(16)}, set the Baud rate for the RS485`);
});