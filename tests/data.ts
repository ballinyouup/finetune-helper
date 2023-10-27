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