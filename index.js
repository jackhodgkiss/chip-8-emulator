/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/style.css":
/*!**************************!*\
  !*** ./public/style.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://chip-8-emulator/./public/style.css?");

/***/ }),

/***/ "./src/display.ts":
/*!************************!*\
  !*** ./src/display.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Display = void 0;\nclass Display {\n    constructor() {\n        this._rows = 32;\n        this._columns = 64;\n        this._pixels = [];\n        if (typeof window != \"undefined\") {\n            this.initialise_display();\n        }\n    }\n    initialise_display() {\n        const emulator_screen = document.getElementById(\"emulator-screen\");\n        for (let row = 0; row < this._rows; row++) {\n            const pixel_column = [];\n            for (let column = 0; column < this._columns; column++) {\n                const pixel = document.createElement(\"div\");\n                pixel.classList.add(\"pixel\");\n                if (Math.random() <= 0.5) {\n                    pixel.classList.add(\"high\");\n                }\n                emulator_screen.appendChild(pixel);\n                pixel_column.push(pixel);\n            }\n            this._pixels.push(pixel_column);\n        }\n    }\n    toggle_pixel(abscissa, ordinate) {\n        const is_high = this._pixels[ordinate][abscissa].classList.contains(\"high\");\n        if (is_high) {\n            this._pixels[ordinate][abscissa].classList.remove(\"high\");\n        }\n        else {\n            this._pixels[ordinate][abscissa].classList.add(\"high\");\n        }\n        return is_high;\n    }\n    clear() {\n        for (const column of this._pixels) {\n            column.forEach(pixel => {\n                pixel.classList.remove(\"high\");\n            });\n        }\n    }\n    get pixels() {\n        return this._pixels;\n    }\n}\nexports.Display = Display;\n\n\n//# sourceURL=webpack://chip-8-emulator/./src/display.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst processor_1 = __webpack_require__(/*! processor */ \"./src/processor.ts\");\nclass Emulator {\n    constructor() {\n        this._processor = new processor_1.Processor(4096);\n        this._processor.load_program([\n            0x00E0, 0xA055, 0xD005,\n            0xA05A, 0x6105, 0xD105,\n            0xA05F, 0x610A, 0xD105,\n            0xA082, 0x610F, 0xD105\n        ]);\n        this._state = document.getElementById(\"state\");\n        this.display_state();\n    }\n    display_state() {\n        const registers = Object.keys(this._processor.registers);\n        this._state.innerText = \"\";\n        registers.forEach(register_name => {\n            this._state.innerText += `${this._processor.registers[register_name].name}: ${this._processor.registers[register_name].value}\\n`;\n        });\n    }\n    step() {\n        this._processor.step();\n        this.display_state();\n    }\n}\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const emulator = new Emulator();\n    const next_button = document.getElementById(\"next-button\");\n    next_button.addEventListener(\"click\", () => {\n        emulator.step();\n    });\n});\n\n\n//# sourceURL=webpack://chip-8-emulator/./src/index.ts?");

/***/ }),

/***/ "./src/instruction.ts":
/*!****************************!*\
  !*** ./src/instruction.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Instructions = void 0;\nvar Instructions;\n(function (Instructions) {\n    Instructions[Instructions[\"NOP\"] = 0] = \"NOP\";\n    Instructions[Instructions[\"CLS\"] = 224] = \"CLS\";\n    Instructions[Instructions[\"RET\"] = 238] = \"RET\";\n    Instructions[Instructions[\"GOTO\"] = 4096] = \"GOTO\";\n    Instructions[Instructions[\"CALL\"] = 8192] = \"CALL\";\n    Instructions[Instructions[\"SKPIM\"] = 12288] = \"SKPIM\";\n    Instructions[Instructions[\"SKPNIM\"] = 16384] = \"SKPNIM\";\n    Instructions[Instructions[\"SKPEQ\"] = 20480] = \"SKPEQ\";\n    Instructions[Instructions[\"ASHEX\"] = 24576] = \"ASHEX\";\n    Instructions[Instructions[\"ADD\"] = 28672] = \"ADD\";\n    Instructions[Instructions[\"COPY\"] = 32768] = \"COPY\";\n    Instructions[Instructions[\"OR\"] = 32769] = \"OR\";\n    Instructions[Instructions[\"AND\"] = 32770] = \"AND\";\n    Instructions[Instructions[\"XOR\"] = 32771] = \"XOR\";\n    Instructions[Instructions[\"ADDF\"] = 32772] = \"ADDF\";\n    Instructions[Instructions[\"SUBY\"] = 32773] = \"SUBY\";\n    Instructions[Instructions[\"SHR\"] = 32774] = \"SHR\";\n    Instructions[Instructions[\"SUBX\"] = 32775] = \"SUBX\";\n    Instructions[Instructions[\"SHL\"] = 32782] = \"SHL\";\n    Instructions[Instructions[\"SKPNEQ\"] = 36864] = \"SKPNEQ\";\n    Instructions[Instructions[\"SIP\"] = 40960] = \"SIP\";\n    Instructions[Instructions[\"GOTOV\"] = 45056] = \"GOTOV\";\n    Instructions[Instructions[\"RBAND\"] = 49152] = \"RBAND\";\n    Instructions[Instructions[\"SHOW\"] = 53248] = \"SHOW\";\n    Instructions[Instructions[\"SKPKEQ\"] = 57502] = \"SKPKEQ\";\n    Instructions[Instructions[\"SKPKNEQ\"] = 57505] = \"SKPKNEQ\";\n    Instructions[Instructions[\"STOP\"] = 61440] = \"STOP\";\n    Instructions[Instructions[\"TIME\"] = 61447] = \"TIME\";\n    Instructions[Instructions[\"INHEX\"] = 61450] = \"INHEX\";\n    Instructions[Instructions[\"STIME\"] = 61461] = \"STIME\";\n    Instructions[Instructions[\"SPITCH\"] = 61463] = \"SPITCH\";\n    Instructions[Instructions[\"STONE\"] = 61464] = \"STONE\";\n    Instructions[Instructions[\"ADDIP\"] = 61470] = \"ADDIP\";\n    Instructions[Instructions[\"DSPDIG\"] = 61481] = \"DSPDIG\";\n    Instructions[Instructions[\"DSPCHR\"] = 61482] = \"DSPCHR\";\n    Instructions[Instructions[\"DEQ\"] = 61491] = \"DEQ\";\n    Instructions[Instructions[\"STORE\"] = 61525] = \"STORE\";\n    Instructions[Instructions[\"LOAD\"] = 61541] = \"LOAD\";\n    Instructions[Instructions[\"SEND\"] = 61552] = \"SEND\";\n    Instructions[Instructions[\"RECV\"] = 61553] = \"RECV\";\n    Instructions[Instructions[\"SBAUD\"] = 61554] = \"SBAUD\";\n})(Instructions = exports.Instructions || (exports.Instructions = {}));\n\n\n//# sourceURL=webpack://chip-8-emulator/./src/instruction.ts?");

/***/ }),

/***/ "./src/memory.ts":
/*!***********************!*\
  !*** ./src/memory.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.create_memory = exports.font_data = void 0;\nexports.font_data = [\n    0xF0, 0x90, 0x90, 0x90, 0xF0,\n    0x20, 0x60, 0x20, 0x20, 0x70,\n    0xF0, 0x10, 0xF0, 0x80, 0xF0,\n    0xF0, 0x10, 0xF0, 0x10, 0xF0,\n    0x90, 0x90, 0xF0, 0x10, 0x10,\n    0xF0, 0x80, 0xF0, 0x10, 0xF0,\n    0xF0, 0x80, 0xF0, 0x90, 0xF0,\n    0xF0, 0x10, 0x20, 0x40, 0x40,\n    0xF0, 0x90, 0xF0, 0x90, 0xF0,\n    0xF0, 0x90, 0xF0, 0x10, 0xF0,\n    0xF0, 0x90, 0xF0, 0x90, 0x90,\n    0xE0, 0x90, 0xE0, 0x90, 0xE0,\n    0xF0, 0x80, 0x80, 0x80, 0xF0,\n    0xE0, 0x90, 0x90, 0x90, 0xE0,\n    0xF0, 0x80, 0xF0, 0x80, 0xF0,\n    0xF0, 0x80, 0xF0, 0x80, 0x80\n];\nconst create_memory = (memory_size) => {\n    const memory = new Uint8Array(memory_size);\n    for (let index = 0; index < exports.font_data.length; index++) {\n        memory[index + 0x50] = exports.font_data[index];\n    }\n    return memory;\n};\nexports.create_memory = create_memory;\n\n\n//# sourceURL=webpack://chip-8-emulator/./src/memory.ts?");

/***/ }),

/***/ "./src/processor.ts":
/*!**************************!*\
  !*** ./src/processor.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Processor = void 0;\nconst display_1 = __webpack_require__(/*! display */ \"./src/display.ts\");\nconst instruction_1 = __webpack_require__(/*! instruction */ \"./src/instruction.ts\");\nconst memory_1 = __webpack_require__(/*! memory */ \"./src/memory.ts\");\nconst register_1 = __webpack_require__(/*! register */ \"./src/register.ts\");\nclass Processor {\n    constructor(memory_size) {\n        this._system_memory = (0, memory_1.create_memory)(memory_size);\n        this.initialise_register();\n        if (typeof window != \"undefined\") {\n            this._display = new display_1.Display();\n        }\n    }\n    initialise_register() {\n        this._registers = Object.keys(register_1.RegisterNames).reduce((registers, name, _) => {\n            registers[name] = new register_1.Register(register_1.RegisterNames[name], 0x0);\n            return registers;\n        }, {});\n    }\n    load_program(program) {\n        this._registers[register_1.RegisterNames.PC].value = 0x0200;\n        program.forEach((value, index, _) => {\n            const high_bits = value >> 8;\n            const low_bits = value & 0xFF;\n            this._system_memory[0x200 + (index * 2)] = high_bits;\n            this._system_memory[0x201 + (index * 2)] = low_bits;\n        });\n    }\n    step() {\n        const instruction = this.fetch_instruction();\n        this.decode_instruction(instruction);\n    }\n    fetch_instruction() {\n        let program_counter = this._registers[register_1.RegisterNames.PC].value;\n        const high_bits = this._system_memory[program_counter++];\n        const low_bits = this._system_memory[program_counter++];\n        this._registers[register_1.RegisterNames.PC].value = program_counter;\n        return high_bits << 8 | low_bits;\n    }\n    mask_instruction(instruction) {\n        const masked = {\n            first_nibble: instruction & 0xF000,\n            second_nibble: instruction & 0x0F00,\n            third_nibble: instruction & 0x00F0,\n            fourth_nibble: instruction & 0x000F,\n            first_byte: instruction & 0xFF00,\n            second_byte: instruction & 0x00FF,\n            twelve_bits: instruction & 0x0FFF,\n            first_last: instruction & 0xF00F,\n            first_third_last: instruction & 0xF0FF\n        };\n        return masked;\n    }\n    decode_instruction(instruction) {\n        let success = true;\n        const masked = this.mask_instruction(instruction);\n        switch (masked.first_nibble) {\n            case 0x0000: {\n                switch (masked.second_byte) {\n                    case instruction_1.Instructions.NOP: {\n                        break;\n                    }\n                    case instruction_1.Instructions.CLS: {\n                        if (typeof window != \"undefined\") {\n                            this._display.clear();\n                        }\n                        break;\n                    }\n                    case instruction_1.Instructions.RET: {\n                        const low_bits = this._system_memory[--this._registers[register_1.RegisterNames.SP].value];\n                        const high_bits = this._system_memory[--this._registers[register_1.RegisterNames.SP].value];\n                        this._registers[register_1.RegisterNames.PC].value = high_bits << 8 | low_bits;\n                        break;\n                    }\n                    default: {\n                        success = false;\n                        break;\n                    }\n                }\n                break;\n            }\n            case instruction_1.Instructions.GOTO: {\n                const jump_location = masked.twelve_bits;\n                this._registers[register_1.RegisterNames.PC].value = jump_location;\n                break;\n            }\n            case instruction_1.Instructions.CALL: {\n                const jump_location = masked.twelve_bits;\n                const high_bits = this._registers[register_1.RegisterNames.PC].value >> 8;\n                const low_bits = this._registers[register_1.RegisterNames.PC].value & 0xFF;\n                this._system_memory[this._registers[register_1.RegisterNames.SP].value++] = high_bits;\n                this._system_memory[this._registers[register_1.RegisterNames.SP].value++] = low_bits;\n                this._registers[register_1.RegisterNames.PC].value = jump_location;\n                break;\n            }\n            case instruction_1.Instructions.SKPIM: {\n                const VX = this._registers[`V${masked.second_nibble >> 8}`].value;\n                const KK = masked.second_byte;\n                if (VX == KK) {\n                    this._registers[register_1.RegisterNames.PC].value += 0x2;\n                }\n                ;\n                break;\n            }\n            case instruction_1.Instructions.SKPNIM: {\n                const VX = this._registers[`V${masked.second_nibble >> 8}`].value;\n                const KK = masked.second_byte;\n                if (VX != KK) {\n                    this._registers[register_1.RegisterNames.PC].value += 0x2;\n                }\n                ;\n                break;\n            }\n            case 0x5000: {\n                switch (masked.first_last) {\n                    case instruction_1.Instructions.SKPEQ: {\n                        const VX = this._registers[`V${masked.second_nibble >> 8}`].value;\n                        const VY = this._registers[`V${masked.third_nibble >> 4}`].value;\n                        if (VX == VY) {\n                            this._registers[register_1.RegisterNames.PC].value += 0x2;\n                        }\n                        ;\n                        break;\n                    }\n                    default: {\n                        success = false;\n                        break;\n                    }\n                }\n                break;\n            }\n            case instruction_1.Instructions.ASHEX: {\n                this._registers[`V${masked.second_nibble >> 8}`].value = masked.second_byte;\n                break;\n            }\n            case instruction_1.Instructions.ADD: {\n                this._registers[`V${masked.second_nibble >> 8}`].value += masked.second_byte;\n                break;\n            }\n            case 0x8000: {\n                switch (masked.first_last) {\n                    case instruction_1.Instructions.COPY: {\n                        const VY = this._registers[`V${masked.third_nibble >> 4}`].value;\n                        this._registers[`V${masked.second_nibble >> 8}`].value = VY;\n                        break;\n                    }\n                    case instruction_1.Instructions.OR: {\n                        const VX = this._registers[`V${masked.second_nibble >> 8}`].value;\n                        const VY = this._registers[`V${masked.third_nibble >> 4}`].value;\n                        this._registers[`V${masked.second_nibble >> 8}`].value = VX | VY;\n                        break;\n                    }\n                    case instruction_1.Instructions.AND: {\n                        const VX = this._registers[`V${masked.second_nibble >> 8}`].value;\n                        const VY = this._registers[`V${masked.third_nibble >> 4}`].value;\n                        this._registers[`V${masked.second_nibble >> 8}`].value = VX & VY;\n                        break;\n                    }\n                    case instruction_1.Instructions.XOR: {\n                        const VX = this._registers[`V${masked.second_nibble >> 8}`].value;\n                        const VY = this._registers[`V${masked.third_nibble >> 4}`].value;\n                        this._registers[`V${masked.second_nibble >> 8}`].value = VX ^ VY;\n                        break;\n                    }\n                    case instruction_1.Instructions.ADDF: {\n                        const VX = this._registers[`V${masked.second_nibble >> 8}`].value;\n                        const VY = this._registers[`V${masked.third_nibble >> 4}`].value;\n                        this._registers[`V${masked.second_nibble >> 8}`].value += VY;\n                        if (VY > (0xFF - VX)) {\n                            this._registers[register_1.RegisterNames.VF].value = 1;\n                        }\n                        else {\n                            this._registers[register_1.RegisterNames.VF].value = 0;\n                        }\n                        break;\n                    }\n                    case instruction_1.Instructions.SUBY: {\n                        const VX = this._registers[`V${masked.second_nibble >> 8}`].value;\n                        const VY = this._registers[`V${masked.third_nibble >> 4}`].value;\n                        this._registers[`V${masked.second_nibble >> 8}`].value -= VY;\n                        if (VY < VX) {\n                            this._registers[register_1.RegisterNames.VF].value = 1;\n                        }\n                        else {\n                            this._registers[register_1.RegisterNames.VF].value = 0;\n                        }\n                        break;\n                    }\n                    case instruction_1.Instructions.SHR: {\n                        const VY = this._registers[`V${masked.third_nibble >> 4}`].value;\n                        this._registers[`V${masked.second_nibble >> 8}`].value = VY >> 1;\n                        if ((VY & 0x1) == 0x1) {\n                            this._registers[register_1.RegisterNames.VF].value = 1;\n                        }\n                        else {\n                            this._registers[register_1.RegisterNames.VF].value = 0;\n                        }\n                        break;\n                    }\n                    case instruction_1.Instructions.SUBX: {\n                        const VX = this._registers[`V${masked.second_nibble >> 8}`].value;\n                        const VY = this._registers[`V${masked.third_nibble >> 4}`].value;\n                        this._registers[`V${masked.second_nibble >> 8}`].value = VY - VX;\n                        if (VY < VX) {\n                            this._registers[register_1.RegisterNames.VF].value = 0;\n                        }\n                        else {\n                            this._registers[register_1.RegisterNames.VF].value = 1;\n                        }\n                        break;\n                    }\n                    case instruction_1.Instructions.SHL: {\n                        const VY = this._registers[`V${masked.third_nibble >> 4}`].value;\n                        this._registers[`V${masked.second_nibble >> 8}`].value = VY << 1;\n                        if ((VY & 0x80) == 0x80) {\n                            this._registers[register_1.RegisterNames.VF].value = 1;\n                        }\n                        else {\n                            this._registers[register_1.RegisterNames.VF].value = 0;\n                        }\n                        break;\n                    }\n                    default: {\n                        success = false;\n                        break;\n                    }\n                }\n                break;\n            }\n            case instruction_1.Instructions.SKPNEQ: {\n                const VX = this._registers[`V${masked.second_nibble >> 8}`].value;\n                const VY = this._registers[`V${masked.third_nibble >> 4}`].value;\n                if (VX != VY) {\n                    this._registers[register_1.RegisterNames.PC].value += 0x2;\n                }\n                ;\n                break;\n            }\n            case instruction_1.Instructions.SIP: {\n                const memory_location = masked.twelve_bits;\n                this._registers[register_1.RegisterNames.IP].value = memory_location;\n                break;\n            }\n            case instruction_1.Instructions.GOTOV: {\n                const jump_location = masked.twelve_bits + this._registers[register_1.RegisterNames.V0].value;\n                this._registers[register_1.RegisterNames.PC].value = jump_location;\n                break;\n            }\n            case instruction_1.Instructions.RBAND: {\n                const generate_random_number = () => Math.floor(Math.random() * 0xFF + 0x1);\n                this._registers[`V${masked.second_nibble >> 8}`].value = masked.second_byte & generate_random_number();\n                break;\n            }\n            case instruction_1.Instructions.SHOW: {\n                const VX = this._registers[`V${masked.second_nibble >> 8}`].value & 63;\n                const VY = this._registers[`V${masked.third_nibble >> 4}`].value & 31;\n                const IP = this._registers[register_1.RegisterNames.IP].value;\n                const N = masked.fourth_nibble;\n                this._registers[register_1.RegisterNames.VF].value = 0;\n                for (let column = 0; column < N; column++) {\n                    const sprite_row = this._system_memory[IP + column];\n                    for (let row = 0; row < 8; row++) {\n                        if (VX + row > 63 || VY + column > 31) {\n                            continue;\n                        }\n                        if ((sprite_row & (0x80 >> row)) != 0) {\n                            if (this._display.toggle_pixel(VX + row, VY + column)) {\n                                this._registers[register_1.RegisterNames.VF].value = 1;\n                            }\n                        }\n                    }\n                }\n                break;\n            }\n            case 0xE000: {\n                switch (masked.first_third_last) {\n                    case instruction_1.Instructions.SKPKEQ: {\n                        break;\n                    }\n                    case instruction_1.Instructions.SKPKNEQ: {\n                        break;\n                    }\n                    default: {\n                        success = false;\n                        break;\n                    }\n                }\n                break;\n            }\n            case 0xF000: {\n                switch (masked.first_third_last) {\n                    case instruction_1.Instructions.STOP: {\n                        break;\n                    }\n                    case instruction_1.Instructions.TIME: {\n                        break;\n                    }\n                    case instruction_1.Instructions.INHEX: {\n                        break;\n                    }\n                    case instruction_1.Instructions.STIME: {\n                        break;\n                    }\n                    case instruction_1.Instructions.SPITCH: {\n                        break;\n                    }\n                    case instruction_1.Instructions.STONE: {\n                        break;\n                    }\n                    case instruction_1.Instructions.ADDIP: {\n                        this._registers[register_1.RegisterNames.IP].value += this._registers[`V${masked.second_nibble >> 8}`].value;\n                        break;\n                    }\n                    case instruction_1.Instructions.DSPDIG: {\n                        break;\n                    }\n                    case instruction_1.Instructions.DSPCHR: {\n                        break;\n                    }\n                    case instruction_1.Instructions.DEQ: {\n                        let VX = this._registers[`V${masked.second_nibble >> 8}`].value;\n                        const IP = this._registers[register_1.RegisterNames.IP].value;\n                        for (let counter = 3; counter > 0; counter--) {\n                            this._system_memory[IP + counter - 1] = VX % 10;\n                            VX /= 10;\n                        }\n                        break;\n                    }\n                    case instruction_1.Instructions.STORE: {\n                        const X = masked.second_nibble >> 8;\n                        const IP = this._registers[register_1.RegisterNames.IP].value;\n                        for (let counter = 0; counter <= X; counter++) {\n                            this._system_memory[IP + counter] = this._registers[`V${counter}`].value;\n                        }\n                        break;\n                    }\n                    case instruction_1.Instructions.LOAD: {\n                        const X = masked.second_nibble >> 8;\n                        const IP = this._registers[register_1.RegisterNames.IP].value;\n                        for (let counter = 0; counter <= X; counter++) {\n                            this._registers[`V${counter}`].value = this._system_memory[IP + counter];\n                        }\n                        break;\n                    }\n                    case instruction_1.Instructions.SEND: {\n                        break;\n                    }\n                    case instruction_1.Instructions.RECV: {\n                        break;\n                    }\n                    case instruction_1.Instructions.SBAUD: {\n                        break;\n                    }\n                    default: {\n                        success = false;\n                        break;\n                    }\n                }\n                break;\n            }\n            default: {\n                success = false;\n                break;\n            }\n        }\n        return success ? { error: undefined } : { error: `${instruction} could not be decoded` };\n    }\n    get system_memory() {\n        return this._system_memory;\n    }\n    get registers() {\n        return this._registers;\n    }\n    get state() {\n        let result = `Chip-8 Processor\\nSystem Memory: ${this._system_memory.length} Bytes\\nRegisters:\\n`;\n        const registers = Object.keys(this._registers);\n        registers.forEach(register_name => {\n            result += `${this._registers[register_name].state}\\n`;\n        });\n        return result;\n    }\n}\nexports.Processor = Processor;\n\n\n//# sourceURL=webpack://chip-8-emulator/./src/processor.ts?");

/***/ }),

/***/ "./src/register.ts":
/*!*************************!*\
  !*** ./src/register.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RegisterNames = exports.Register = void 0;\nclass Register {\n    constructor(name, value) {\n        this._name = name;\n        this._is_sixteen_bit = [\n            RegisterNames.PC,\n            RegisterNames.SP,\n            RegisterNames.IP\n        ].includes(name);\n        this.value = value;\n    }\n    get name() {\n        return this._name;\n    }\n    get value() {\n        return this._value;\n    }\n    set value(value) {\n        this._value = value & (this._is_sixteen_bit ? 0xFFFF : 0xFF);\n    }\n    get is_sixteen_bit() {\n        return this._is_sixteen_bit;\n    }\n    get state() {\n        return `${this._name}: ${this._value}, Size: ${this._is_sixteen_bit ? 16 : 14} bits`;\n    }\n}\nexports.Register = Register;\nvar RegisterNames;\n(function (RegisterNames) {\n    RegisterNames[\"V0\"] = \"V0\";\n    RegisterNames[\"V1\"] = \"V1\";\n    RegisterNames[\"V2\"] = \"V2\";\n    RegisterNames[\"V3\"] = \"V3\";\n    RegisterNames[\"V4\"] = \"V4\";\n    RegisterNames[\"V5\"] = \"V5\";\n    RegisterNames[\"V6\"] = \"V6\";\n    RegisterNames[\"V7\"] = \"V7\";\n    RegisterNames[\"V8\"] = \"V8\";\n    RegisterNames[\"V9\"] = \"V9\";\n    RegisterNames[\"VA\"] = \"VA\";\n    RegisterNames[\"VB\"] = \"VB\";\n    RegisterNames[\"VC\"] = \"VC\";\n    RegisterNames[\"VD\"] = \"VD\";\n    RegisterNames[\"VE\"] = \"VE\";\n    RegisterNames[\"VF\"] = \"VF\";\n    RegisterNames[\"ST\"] = \"ST\";\n    RegisterNames[\"DT\"] = \"DT\";\n    RegisterNames[\"PC\"] = \"PC\";\n    RegisterNames[\"SP\"] = \"SP\";\n    RegisterNames[\"IP\"] = \"IP\";\n})(RegisterNames = exports.RegisterNames || (exports.RegisterNames = {}));\n\n\n//# sourceURL=webpack://chip-8-emulator/./src/register.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_require__("./src/index.ts");
/******/ 	var __webpack_exports__ = __webpack_require__("./public/style.css");
/******/ 	
/******/ })()
;