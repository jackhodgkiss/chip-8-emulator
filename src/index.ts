import { Processor } from "processor";

document.addEventListener("DOMContentLoaded", () => {
    const processor = new Processor(4096);
    processor.load_program([0x00E0]);
    processor.decode_instruction(processor.fetch_instruction());
});