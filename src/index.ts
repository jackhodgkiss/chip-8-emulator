import { Processor } from "processor";

document.addEventListener("DOMContentLoaded", () => {
    const processor = new Processor(4096);
    processor.load_program([0x00E0, 0xA055, 0xD005, 0xA05A, 0x6105, 0xD105, 0xA05F, 0x610A, 0xD105, 0xA082, 0x610F, 0xD105]);
    processor.decode_instruction(processor.fetch_instruction());
    processor.decode_instruction(processor.fetch_instruction());
    processor.decode_instruction(processor.fetch_instruction());
    processor.decode_instruction(processor.fetch_instruction());
    processor.decode_instruction(processor.fetch_instruction());
    processor.decode_instruction(processor.fetch_instruction());
    processor.decode_instruction(processor.fetch_instruction());
    processor.decode_instruction(processor.fetch_instruction());
    processor.decode_instruction(processor.fetch_instruction());
    processor.decode_instruction(processor.fetch_instruction());
    processor.decode_instruction(processor.fetch_instruction());
    processor.decode_instruction(processor.fetch_instruction());
});