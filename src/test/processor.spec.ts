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
})