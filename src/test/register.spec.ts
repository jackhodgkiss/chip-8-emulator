import { expect } from "chai";
import { Register, RegisterNames } from "register";

describe("Register", () => {
    it("Register should have the assigned name and value", () => {
        const register = new Register(RegisterNames.V0, 0x0);
        expect(register.name).is.equal(RegisterNames.V0);
        expect(register.value).is.equal(0x0);
    });
});