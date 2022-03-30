export enum Instructions {
    NOP = 0x0000,
    CLS = 0x00E0,
    RET = 0x00EE,
    GOTO = 0x1000,
    CALL = 0x2000,
    SKPIM = 0x3000,
    SKPNIM = 0x4000,
    SKPEQ = 0x5000,
    ASHEX = 0x6000,
    ADD = 0x7000,
    COPY = 0x8000,
    OR = 0x8001,
    AND = 0x8002,
    XOR = 0x8003,
    ADDF = 0x8004,
    SUBY = 0x8005,
    SHR = 0x08006,
    SUBX = 0x8007,
    SHL = 0x800E,
    SKPNEQ = 0x9000,
    SIP = 0xA000,
    GOTOV = 0xB000,
    RBAND = 0xC000,
    SHOW = 0xD000,
    SKPKEQ = 0xE09E,
    SKPKNEQ = 0xE0A1,
    STOP = 0xF000,
    TIME = 0xF007,
    INHEX = 0xF00A,
    STIME = 0xF015,
    SPITCH = 0xF017,
    STONE = 0xF018,
    ADDIP = 0xF01E,
    DSPDIG = 0xF029,
    DSPCHR = 0xF02A,
    DEQ = 0xF033,
    STORE = 0xF055,
    LOAD = 0xF065,
    SEND = 0xF070,
    RECV = 0xF071,
    SBAUD = 0xF072
}