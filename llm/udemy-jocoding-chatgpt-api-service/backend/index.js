const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

async function apiCall() {
  const completion = await openai.chat.completions.create({
    messages: [{role: 'user', content: 'Say this is a test'}],
    model: 'gpt-3.5-turbo'
  })
  console.log(completion.choices)
}
apiCall()