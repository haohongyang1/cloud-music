function createElement (type,props, children) {
    delete props.__source
    delete props.__self
    return {
        type,
        props: {
            props,children
        }
    }
}
/**
 * 
 * @param {虚拟dom} vdom 
 * @param {容器} container 
 */
function render (vdom,container) {
    container.innerHTML = "<pre>"+JSON.stringify(vdom,null,2)+"</pre>"
}
export default {
    createElement,render
}
