import axios from "axios";
let system = `You convert long form text into thick paragraphs, respond in JSON format for each paragraph: \n{"text": //insert response}\n{"text": //insert response}\n{"text": //insert response}`;
type Response = {
    status: string;
    prompt: string[];
    model: string;
    model_owner: string;
    tags: {};
    num_returns: number;
    args: {
        model: string;
        max_tokens: number;
        prompt: string;
        request_type: string;
        temperature: number;
        top_p: number;
        top_k: number;
        repetition_penalty: number;
        stream_tokens: boolean;
        stop: string[];
        negative_prompt: string;
        sessionKey: string;
    };
    subjobs: [];
    output: {
        choices: [
            {
                text: string;
            }
        ];
        request_id: string;
    };
};
let prompt =
    'A car, or an automobile, is a motor vehicle with wheels. Most definitions of cars state that they run primarily on roads, seat one to eight people, have four wheels, and mainly transport people, not cargo.[1][2] French inventor Nicolas-Joseph Cugnot built the first steam-powered road vehicle in 1769, while French-born Swiss inventor François Isaac de Rivaz designed and constructed the first internal combustion-powered automobile in 1808. The modern car—a practical, marketable automobile for everyday use—was invented in 1886, when German inventor Carl Benz patented his Benz Patent-Motorwagen. Commercial cars became widely available during the 20th century. One of the first cars affordable by the masses was the 1908 Model T, an American car manufactured by the Ford Motor Company. Cars were rapidly adopted in the US, where they replaced horse-drawn carriages.[3] In Europe and other parts of the world, demand for automobiles did not increase until after World War II.[4] The car is considered an essential part of the developed economy. ';
export async function fetchData() {
    const response = await axios.post(
        'https://api.together.xyz/inference',
        {
            model: 'teknium/OpenHermes-2-Mistral-7B',
            max_tokens: 3072,
            prompt: `<|im_start|>system ${system}<|im_end|><|im_start|>user ${prompt}<|im_end|> <|im_start|>assistant `,
            request_type: 'language-model-inference',
            temperature: 0.4,
            top_p: 0.7,
            top_k: 50,
            repetition_penalty: 1,
            stream_tokens: false,
            stop: ['<|im_end|>', '<|im_start|>'],
            negative_prompt: '',
            sessionKey: '8eeffa70d2a542ce54691f422557fec0e490eb5e'
        },
        {
            headers: {
                Authorization: 'Bearer d0b1df1d7515378588d46eb15c9f4400dd64cdacc1f7d18d2306f8a798096515'
            }
        }
    );
    console.log(response.data);
    let data = response.data;
    return JSON.stringify(data.output.choices);
}