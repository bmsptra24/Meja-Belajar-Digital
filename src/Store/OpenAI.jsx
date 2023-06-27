import { Configuration, OpenAIApi } from "openai";
import { updateData } from "./Database";

const configuration = new Configuration({
  // apiKey: process.env.VITE_APP_OPENAI_KEY,
  // organization: process.env.VITE_APP_OPENAI_OGRANIZATION,
  apiKey: "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",
  organization: "org-orCdtXkVs4BhevWrjR0Oj1Wu",
});
// Delete it
configuration.baseOptions.headers = {
  Authorization: configuration.baseOptions.headers.Authorization,
};
const openai = new OpenAIApi(configuration);

// get data from api
export const getDataFromChatGPT = async (input) => {
  // const response = await openai.createCompletion('code-davinci-001', {
  //   prompt: input,
  //   temperature: 0.1,
  //   max_tokens: 2000,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0.5,
  // })

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: input,
      temperature: 0.2,
      max_tokens: 200,
      top_p: 0.1,
      frequency_penalty: 0,
      presence_penalty: 0.5,
    });

    const data = response.data.choices[0].message;
    return data;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }

  // data static dev
  // return (data = 'oke!')
};

// get answer from api
export const getAnswer = async (path, log, input, setState, defaultSystem) => {
  // reset state
  setState("");
  if (input.length !== 0) {
    const templateUser = [
      defaultSystem,
      ...log,
      { content: input, role: "user" },
    ];
    await updateData(path, templateUser);

    const data = await getDataFromChatGPT(templateUser);
    if (data) {
      updateData(path, [...templateUser, data]);
    } else {
      const templateError = { role: "assistant", content: "error" };
      updateData(path, templateError);
    }
  }
};
