

// 下一个单元任务
// render 会初始化第一个任务；
let nextUnitOfWork = null
/**
 * 调度我们的diff或者渲染任务
 */
function workLoop(dealline) {
    // 有下一个任务，并且当前帧还没结束
    wihile(nextUnitOfWork&& dealline.timeRemainint() >1) {
        nextUnitOfWork = preformUnitOfWork(nextUnitOfWork)
    }
    requestIdleCallback(workLoop)

}
// 启动空闲时间渲染
requestIdleCallback(workLoop)

// 

function preformUnitOfWork (fiber) {
    // 获取下一个任务
    // 根据当前任务，获取下一个 （类似于链表）
}