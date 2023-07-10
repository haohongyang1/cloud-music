export interface GptMsg {
  role: string
  content: string
}
export type GptMsgs = Array<GptMsg>
const parsePack = (str: string) => {
  // 定义正则表达式匹配模式
  const pattern = /data:\s*({.*?})\s*\n/g
  // 定义一个数组来存储所有匹 配到的 JSON 对象
  const result = []
  // 使用正则表达式匹配完整的 JSON 对象并解析它们
  let match
  while ((match = pattern.exec(str)) !== null) {
    const jsonStr = match[1]
    try {
      const json = JSON.parse(jsonStr)
      result.push(json)
    } catch (e) {
      console.log(e)
    }
  }
  // 输出所有解析出的 JSON 对象
  return result
}

export class StreamGpt {
  onStart: (prompt: string) => void
  onCreated: () => void
  onDone: () => void
  onPatch: (text: string) => void
  constructor(
    private key: string,
    options: {
      onStart: (prompt: string) => void
      onCreated: () => void
      onDone: () => void
      onPatch: (text: string) => void
    }
  ) {
    const { onStart, onCreated, onDone, onPatch } = options
    this.onStart = onStart
    this.onCreated = onCreated
    this.onPatch = onPatch
    this.onDone = onDone
  }
  async stream(prompt: string, history: GptMsgs = []) {
    let finish = false
    let count = 0
    // 触发onStart
    this.onStart(prompt)
    // 发起请求
    const res = await this.fetch([
      ...history,
      { role: 'user', content: prompt }
    ])
    if (!res.body) return
    // 从response中获取reader
    const reader = res.body.getReader()
    const decoder: TextDecoder = new TextDecoder()
    // 循环读取内容
    while (!finish) {
      const { done, value } = await reader.read()
      // console.log(value)
      if (done) {
        finish = true
        this.onDone()
        break
      }
      count++
      const jsonArray = parsePack(decoder.decode(value))
      if (count === 1) {
        this.onCreated()
      }
      jsonArray.forEach((json: any) => {
        if (!json.choices || json.choices.length === 0) {
          return
        }
        const text = json.choices[0].delta.content
        this.onPatch(text)
      })
    }
  }
  async fetch(messages: GptMsgs) {
    return await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        stream: true
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.key}`
      }
    })
  }
}
