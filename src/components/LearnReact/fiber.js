const sleep = delay => {
    for (let start = Date.now(); Date.now() - start <= delay;) {}
}
function start() {

    /**
     * 模拟fiber将一个任务执行
     * taskQueue执行一个任务队列，按顺序执行
     */
    let taskQueue = [
        () => {
            console.log('task1 start')
            sleep(20)
            console.log('task1 end')
        },
        () => {
            console.log('task2 start')
            sleep(20)
            console.log('task2 end')
        },
        () => {
            console.log('task3 start')
            sleep(20)
            console.log('task3 end')
        },
    ]

    function preformUnitOfWork() {
        // 取出队列第一个任务并执行
        console.log("取出执行");
        taskQueue.shift()()
    }
    function workLoop(deadline) {
        console.log(`本次执行的剩余时间还有多少===`, deadline.timeRemaining(),deadline.didTimeout)
        // didTimeout 返回 callback 任务是否超时、timeRamining 返回当前帧还剩多少时间供用户使用
        while ((deadline.timeRemaining() > 0 ) && taskQueue.length > 0) {
            // 走到这里，说明时间有余
            preformUnitOfWork()
        }
        // 走到这里，说明时间不够了
        if (taskQueue.length > 0) {
            window.requestIdleCallback(workLoop, { timeout: 1000 })
        }
    }
    requestIdleCallback(workLoop, { timeout: 1000 })
}
export default start
 