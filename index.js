import { Configuration, OpenAIApi } from "openai";

class ChatGPT {
  /**
   *
   * @param {import("./types").ChatGPTOptions} options
   */
  constructor(options) {
    this.orgKey = options.authId;
    this.apiKey = options.apiKey;
    this.configuration = new Configuration({
      organization: this.orgKey,
      apiKey: this.apiKey,
    });
    this.openai = new OpenAIApi(this.configuration);
  }

  async chat(content, requester) {
    if (!content || !requester) {
      throw new Error("Content and requester cannot be null or undefined");
    }

    try {
      let response = await this.openai.createCompletion({
        model: "davinci",
        prompt: `ChatGPT is a friendly chatbot. \n\
          ChatGPT : Hello, how are you?\n\
          ${requester}: ${content}\n\
          ChatGPT:`,
        temperature: 0.9,
        max_tokens: 100,
        stop: ["ChatGPT:", "Kabir Jaipal:"],
      });
      return response.data.choices.at(0).text;
    } catch (error) {
      throw new Error(`Failed to complete API call: ${error.message}`);
    }
  }
}

export { ChatGPT };
