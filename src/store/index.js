// const AV = window.AV;
const AV  = require ('../libs/av-core-min');
const adapters = require('../libs/leancloud-adapters-weapp');
AV.setAdapters(adapters);
AV.init({
  appId: "zHlFHhCLhLquR91aT5hJtJjg-gzGzoHsz",
  appKey: "gtbo9ISCbKbFF9iu2e4oWoRR",
  serverURL: "https://zhlfhhcl.lc-cn-n1-shared.com"
});


export function setItem(name, value) {
  return new Promise((resolve, reject) => {
    // 声明 class
    const Todo = AV.Object.extend(name);
    // 构建对象
    const todo = new Todo();
    // 为属性赋值
    Object.entries(value).forEach(item => {
      const [key, val] = item;
      todo.set(key, val);
    })
// 将对象保存到云端
    todo.save().then((res) => {
      // 成功保存之后，执行其他逻辑
      console.log(`保存成功。objectId：${res.id}`);
      resolve(res);
    }, (error) => {
      // 异常处理
      console.log(error)
      reject(error);
    });
  })
}

export function queryAll(name) {
  const query = new AV.Query(name);
  return new Promise((resolve, reject) => {
    query.find().then(res => {
      res = res.map(nape => {
        return {
          ...nape.attributes,
          id: nape.id
        }
      })
      resolve(res)
    }).catch(reason => {
      reject(reason);
    })
  })
}




export default AV;


