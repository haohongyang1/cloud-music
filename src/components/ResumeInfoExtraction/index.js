import React, { useEffect, useRef, useState } from 'react'
// import { getGPT4Stream } from '../../api/request'
import * as css from './style'
import { StreamGpt } from '../../utils/StreamGpt'
// import { Typewriter } from '../../utils/Typewriter'
const ResumeInfoExtraction = () => {
    const [text, setText] = useState('')
    const streamingText = useRef('')
    const streaming = useRef(false)
    const [trainInfo,setTrainInfo] = useState('')
    
    // useEffect(() => {
    //     const typewriter = new Typewriter((str) => {
    //         streamingText.current += str || ''
    //         console.log('str==', str, '===textInfo.current===', streamingText.current)
    //         setText(streamingText.current)
    //     })
    //     const fetchGpt = new StreamGpt('XXX', {
    //         onStart: (prompt) => {
    //             streaming.current = true
    //         },
    //         onCreated: () => {
    //             typewriter.start()

    //             console.log("第一个回包执行==onCreated==")
    //         },
    //         onPatch: (streamText) => {
    //             typewriter.add(streamText)
    //         },
    //         onDone: () => {
    //             console.log("结束==onDone=")
    //             typewriter.done()
    //             streaming.current = false
    //             streamingText.current = ''
    //         }
    //     })
    //     // fetchGpt.stream('')
    // }, [])
    const onConfirmClick = () => {
        console.log("trainInfo===", trainInfo);
    }
    return <css.Container>
         <input
            value={trainInfo} // ...force the input's value to match the state variable...
            onChange={e => setTrainInfo(e.target.value)} // ... and update the state variable on any edits!
            />
        <css.ConfirmButton onClick={onConfirmClick}>
            提交
        </css.ConfirmButton>
        <css.AnswerInfo></css.AnswerInfo>
    </css.Container>
}
export default ResumeInfoExtraction
