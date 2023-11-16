const testCasesLlama = [
    '{"text":"<s>[INST] <<SYS>>Test<</SYS>>1 [/INST] 2</s>"}', // Pass
    '{"text":"<s>[INST] <<SYS>>Hello<</SYS>>World [/INST] Yes</s>"}', // Pass
    '{"text":"<s>[INST] <<SYS>>No<</SYS>>Ending< [/INST] Here</s>"}', // Pass
    '{"text":"<s>[INST] <<SYS>>Invalid<<</SYS>>1 [/INST] 2</s>"}', // Fail
    '{"text":"<s>[INST] <<SYS>>Invalid<</SYS>>1< [/INST] 2</s>"}', // Fail
    '{"text":"<s>[INST] <<SYS>>Invalid<</SYS>>1 [/INST] 2<</s>"}' // Fail
];