import { expect } from "chai";
import { Register, RegisterNames } from "register";

describe("Register", () => {
    it("Check if register name has been set correctly", () => {
        const register = new Register(RegisterNames.SP, 0x0);
        expect(register.name).is.equal('SP');
    });
    it("Check if register value has been default initialised correctly", () => {
        const register = new Register(RegisterNames.V0, 0x0);
        expect(register.value).is.equal(0);
    });
    it("Check if register only `stores` first 8 bits", () => {
        const register = new Register(RegisterNames.V0, 65535);
        expect(register.value).is.equal(255);
    });
    it("Check if special register can store upto 16 bits", () => {
        const register = new Register(RegisterNames.SP, 65535);
        expect(register.value).is.equal(65535);
    });
});