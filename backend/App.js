const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_OGRANIZATION,
})
configuration.baseOptions.headers = {
  Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
}

const openai = new OpenAIApi(configuration)

app.get('/gpt/get-answer', async (req, res) => {
  // res.setHeader('Access-Control-Allow-Credentials', true)
  // res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  // res.setHeader(
  //   'Access-Control-Allow-Methods',
  //   'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  // )
  // res.setHeader(
  //   'Access-Control-Allow-Headers',
  //   'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  // )

  try {
    if (!req.query.data) throw 'Invalid Body'
    const input = await JSON.parse(req.query.data)
    console.log({ input })
    const params = {
      messages: input,
      model: process.env.OPENAI_MODEL,
      temperature: Number(process.env.OPENAI_TEMPERATURE),
      max_tokens: Number(process.env.OPENAI_MAX_TOKEN),
      top_p: Number(process.env.OPENAI_TOP_P),
      frequency_penalty: Number(process.env.OPENAI_FREQUENCY_PENALTY),
      presence_penalty: Number(process.env.OPENAI_PRESENCE_PENALTY),
    }

    const response = await openai.createChatCompletion(params)
    const data = response.data.choices[0].message
    // console.log(data)
    return res.status(200).send(data)
  } catch (error) {
    // console.log(error)
    return res.status(404).send({
      message: error,
      body: { role: 'assistant', content: 'Error...404' },
    })
  }
})

app.get('/', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  )

  res.status(200).send(
    `
  REST API Meja Belajar Digital Work!
  /gpt/get-answer = To get answer from gpt openai
  body exemple:
  [
    {
        "content": "Your name is Meja Belajar Digital. You are a helpful search engine designed to assist students in their learning journey. But if someone asking 'what is meja belajar digital?', you have to answer with 'Meja Belajar Digital is an application that can facilitate students in learning independently effectively by utilizing existing technology, using several learning methods like Blurting, Feynman, and Flashcard method.'",
        "role": "system"
    },
    {
        "content": "Hai",
        "role": "user"
    }
  ]
  `,
  )
})

app.listen(port, () => {
  console.log(`
  Meja Belajar Digital REST API listening on port ${port}
  http://localhost:3000/
  `)
})

// Export the Express API
module.exports = app
