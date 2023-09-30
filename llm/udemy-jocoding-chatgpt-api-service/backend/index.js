const OpenAI = require('openai');
const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

app.post('/fortuneTell', async function(req, res) {
  let { userMessages, assistantMessages} = req.body

  let messages = [
    {role: "system", content: "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗도지입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다."},
    {role: "user", content: "당신은 세계 최고의 점성술사입니다. 당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신의 이름은 챗도지입니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다."},
    {role: "assistant", content: "안녕하세요! 저는 챗도지입니다. 운세와 점성술에 관한 질문이 있으신가요? 어떤 것이든 물어보세요, 최선을 다해 답변해 드리겠습니다."},
  ]

  while (userMessages.length != 0 || assistantMessages.length != 0) {
    if (userMessages.length != 0) {
      messages.push(
        JSON.parse('{"role": "user", "content": "'+String(userMessages.shift()).replace(/\n/g,"")+'"}')
      )
    }
    if (assistantMessages.length != 0) {
      messages.push(
        JSON.parse('{"role": "assistant", "content": "'+String(assistantMessages.shift()).replace(/\n/g,"")+'"}')
      )
    }
  }
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
  })
  const fortune = completion.choices[0].message['content']
  console.log(fortune)
  res.json({"assistant": fortune})
})

app.listen(3000)
