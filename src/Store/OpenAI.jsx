import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
<<<<<<< Updated upstream
  // apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  // apiKey: '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', //el
  apiKey: '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',
  organization: 'org-orCdtXkVs4BhevWrjR0Oj1Wu',
})
=======
  // apiKey: process.env.VITE_APP_OPENAI_KEY,
  // organization: process.env.VITE_APP_OPENAI_OGRANIZATION,
  apiKey: "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",
  organization: "org-orCdtXkVs4BhevWrjR0Oj1Wu",
});
>>>>>>> Stashed changes
// Delete it
configuration.baseOptions.headers = {
  Authorization: configuration.baseOptions.headers.Authorization,
}
const openai = new OpenAIApi(configuration)

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

<<<<<<< Updated upstream
  console.log('get openai api')
  let data

  await openai
    .createChatCompletion({
      model: 'gpt-3.5-turbo',
=======
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
>>>>>>> Stashed changes
      messages: input,
      temperature: 0.2,
      max_tokens: 200,
      top_p: 0.1,
      frequency_penalty: 0,
      presence_penalty: 0.5,
<<<<<<< Updated upstream
    })
    .then((res) => {
      data = res.data.choices[0].message
    })
    .catch((err) => console.log(err))
  return data
=======
    });

    const data = response.data.choices[0].message;
    return data;
  } catch (error) {
    console.log("Error:", error);
    return null;
  }
>>>>>>> Stashed changes

  // data static dev
  // return (data = 'oke!')
}
