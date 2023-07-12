import { updateData } from "./Database";
import axios from "axios";

// get data from api
export const getDataFromChatGPT = async (input) => {
  const link = import.meta.env.VITE_APP_LINK_API_GPT;

  const data = await axios
    .put(link, input)
    .then((data) => data.data)
    .catch((error) => error.response.data.body);

  // console.log(data);
  return data;
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
