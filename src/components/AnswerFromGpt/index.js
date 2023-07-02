import React, { useEffect, useRef, useState } from 'react'
// import { getGPT4Stream } from '../../api/request'
import * as css from './style'
import { StreamGpt } from './StreamGpt.ts'
const AnswerFromGpt = () => {
    const [text, setText] = useState('')
    const textInfo = useRef('')
    useEffect(() => {
        const fetchGpt = new StreamGpt('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', {
            onStart: (prompt) => {
                textInfo.current = ''
                setText('')
                console.log("开始请求=onStart==", prompt);
            },
            onCreated: () => {
                console.log("第一个回包执行==onCreated==")
            },
            onPatch: (streamText) => {
                if (!streamText) return;
                console.log("textInfo===", textInfo.current);
                console.log("有更新内容时==onPatch==", text + streamText)
                textInfo.current = textInfo.current + streamText
                setText(textInfo.current)
            },
            onDone: () => {
                console.log("结束==onDone=")
            }
        })
        fetchGpt.stream('前端工程师的工作内容')
    }, [])
    const onChange = () => { }
    return <css.Container>
        <css.TextareaStyle rows="10" cols="30" value={text} name="info" placeholder="为您推荐最优文案" type='text' defaultValue="" onChange={onChange} />
    </css.Container>
}
export default AnswerFromGpt