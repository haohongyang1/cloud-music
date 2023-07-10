import React, { useEffect, useRef, useState } from 'react'
// import { getGPT4Stream } from '../../api/request'
import * as css from './style'
import { StreamGpt } from './StreamGpt.ts'
import { Typewriter } from './Typewriter.ts'
const AnswerFromGpt = () => {
    const [text, setText] = useState('')
    const streamingText = useRef('')
    const streaming = useRef(false)
    const [trainInfo,setTrainInfo] = useState('')

    useEffect(() => {
        const typewriter = new Typewriter((str) => {
            streamingText.current += str || ''
            console.log('str==', str, '===textInfo.current===', streamingText.current)
            setText(streamingText.current)
        })
        const fetchGpt = new StreamGpt('XXX', {
            onStart: (prompt) => {
                streaming.current = true
            },
            onCreated: () => {
                typewriter.start()

                console.log("第一个回包执行==onCreated==")
            },
            onPatch: (streamText) => {
                typewriter.add(streamText)
            },
            onDone: () => {
                console.log("结束==onDone=")
                typewriter.done()
                streaming.current = false
                streamingText.current = ''
            }
        })
        fetchGpt.stream('我是一名3年工作经验的前端开发工程师，正在写简历，帮我写一份工作内容，我在简历中使用')
    }, [])
    const onChange = () => { }
    return <css.Container>
         <input
      value={trainInfo} // ...force the input's value to match the state variable...
      onChange={e => setTrainInfo(e.target.value)} // ... and update the state variable on any edits!
    />
        <css.AnswerInfo></css.AnswerInfo>
    </css.Container>
}
export default AnswerFromGpt
