export const models = {
    OpenAI: {
        textAreas: [
            ["textarea-system", "System", "Entering OpenAI system data"],
            ["textarea-user", "User", "Entering OpenAI user data"],
            ["textarea-assistant", "Assistant", "Entering OpenAI assistant data"]
        ],
        allChecked: "checked-all-openai"
    }, Llama: {
        textAreas: [
            ["textarea-prompt", "Prompt", "Entering Llama Prompt data"],
            ["textarea-completion", "Completion", "Entering Llama Completion data"],
        ],
        allChecked: "checked-all-llama"
    },
};

export type Models = typeof models.OpenAI;

export const expectedOpenAICSV = [{
    system: "Entering OpenAI system data",
    user: "Entering OpenAI user data",
    assistant: "Entering OpenAI assistant data",
}];

export const expectedOpenAIJSONL = [{
    messages: [
        {
            role: "system",
            content: "Entering OpenAI system data",
        },
        {
            role: "user",
            content: "Entering OpenAI user data",
        },
        {
            role: "assistant",
            content: "Entering OpenAI assistant data",
        },
    ],
}];

export const expectedLlamaCSV = [{
    prompt: "Entering Llama Prompt data",
    completion: "Entering Llama Completion data",
}];

export const expectedLlamaJSONL = [{
    prompt: "Entering Llama Prompt data",
    completion: "Entering Llama Completion data",
}];