import { Configuration, OpenAIApi } from "openai";

class ChatGPT {
  /**
   *
   * @param {import("./types").ChatGPTOptions} options
   */
  constructor(options) {
    this.orgKey = options.authId;
    this.apiKey = options.apiKey;
  }

  async chat(content, requester) {
    const configuration = new Configuration({
      organization: this.orgKey,
      apiKey: this.apiKey,
    });
    const openai = new OpenAIApi(configuration);
    let response = await openai
      .createCompletion({
        model: "davinci",
        prompt: `ChatGPT is a friendly chatbot. \n\
        ChatGPT : Hello, how are you?\n\
        ${requester}: ${content}\n\
        ChatGPT:`,
        temperature: 0.9,
        max_tokens: 100,
        stop: ["ChatGPT:", "Kabir Jaipal:"],
      })
      .then((res) => {
        return res.data.choices.at(0).text;
      })
      .catch((e) => {
        return e.message;
      });

    return response;
  }
}

export { ChatGPT };
