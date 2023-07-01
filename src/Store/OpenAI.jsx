import { Configuration, OpenAIApi } from "openai";
import { updateData } from "./Database";

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_APP_OPENAI_KEY,
  organization: import.meta.env.VITE_APP_OPENAI_OGRANIZATION,
});

configuration.baseOptions.headers = {
  Authorization: `Bearer ${import.meta.env.VITE_APP_OPENAI_KEY}`,
};

const openai = new OpenAIApi(configuration);

// get data from api
export const getDataFromChatGPT = async (input) => {
  const params = {
    messages: input,
    model: import.meta.env.VITE_APP_OPENAI_MODEL,
    temperature: Number(import.meta.env.VITE_APP_OPENAI_TEMPERATURE),
    max_tokens: Number(import.meta.env.VITE_APP_OPENAI_MAX_TOKEN),
    top_p: Number(import.meta.env.VITE_APP_OPENAI_TOP_P),
    frequency_penalty: Number(
      import.meta.env.VITE_APP_OPENAI_FREQUENCY_PENALTY
    ),
    presence_penalty: Number(import.meta.env.VITE_APP_OPENAI_PRESENCE_PENALTY),
  };

  try {
    const response = await openai.createChatCompletion(params);

    const data = response.data.choices[0].message;
    return data;
  } catch (error) {
    console.log("Error:", error);
    return { role: "assistant", content: "Error...404" };
  }

  // data static dev
  // return (data = "oke!");
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
