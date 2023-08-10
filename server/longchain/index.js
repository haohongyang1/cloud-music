import { PromptTemplate, OpenAI } from 'langchain'; 

const model = new OpenAI(); // 记得在环境变量中配置你的OpenAI Key
const resA = await model.call('为一个披萨饼餐厅起一个好的名字。');
// resA餐厅起名的结果: 维罗纳披萨馆
res.status(200).json({ result: resA });
