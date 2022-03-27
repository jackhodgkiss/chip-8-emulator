import { expect } from "chai";
import { create_memory } from "memory";

describe("Memory Initialisation", () => {
    it("Array constructed has reserved space for 4096 elements", () => {
        const system_memory: Uint8Array = create_memory(4096);
        expect(system_memory.length).is.equal(4096);
    });
});