export const models = {
    OpenAI: {
        textAreas: [
            ["textarea-system", "System", "Entering system data"],
            ["textarea-user", "User", "Entering user data"],
            ["textarea-assistant", "Assistant", "Entering assistant data"]
        ],
        allChecked: "checked-all"
    },
};

export type Models = typeof models.OpenAI;

export const expectedOpenAICSV = [{
    system: "Entering system data",
    user: "Entering user data",
    assistant: "Entering assistant data",
}];

export const expectedOpenAIJSONL = [{
    messages: [
        {
            role: "system",
            content: "Entering system data",
        },
        {
            role: "user",
            content: "Entering user data",
        },
        {
            role: "assistant",
            content: "Entering assistant data",
        },
    ],
}];

export const expectedLlamaCSV = [{ text: "<s>[INST] <<SYS>>Entering system data<<</SYS>>Entering user data [/INST] Entering assistant data</s>" }];

export const expectedLlamaJSONL = [{ text: "<s>[INST] <<SYS>>Entering system data<<</SYS>>Entering user data [/INST] Entering assistant data</s>" }];