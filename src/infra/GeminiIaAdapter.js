import { GenerativeModel, GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

/**
 * @interface 
 */
export default class GeminiAiAdapter {
    /** @private */
    API_KEY
    /** @private @type {GoogleGenerativeAI};  */
    genAI
    /** @private @type {GenerativeModel};  */
    model

    safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },

    ]

    constructor(API_KEY = process.env.GEMINI_API_KEY, model = "gemini-1.5-flash") {
        this.API_KEY = API_KEY || '';

        this.genAI = new GoogleGenerativeAI(this.API_KEY);
        this.model = this.genAI.getGenerativeModel({
            model, // or gemini-1.5-pro
            safetySettings: this.safetySettings,
        });

    }

    async generateMessage(content, history = []) {
        let contents = [
            ...history,
            {
                role: 'user',
                parts: [
                    { text: content }
                ]
            }
        ];

        console.log(contents)

        // const { response: { candidates } } = await this.model.generateContent({ contents })
        // return candidates[0]
        return 'response dosbdbd'
    }
}

