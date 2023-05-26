import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  // apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  // apiKey: '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', //el
  apiKey: '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',
  organization: 'org-orCdtXkVs4BhevWrjR0Oj1Wu',
})
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

  console.log('get openai api')
  let data

  await openai
    .createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: input,
      // prompt: input,
      temperature: 0.2,
      max_tokens: 200,
      top_p: 0.1,
      frequency_penalty: 0,
      presence_penalty: 0.5,
    })
    .then((res) => {
      data = res.data.choices[0].message
    })
    .catch((err) => console.log(err))
  return data

  // data static dev
  // return (data = 'oke!')
}
