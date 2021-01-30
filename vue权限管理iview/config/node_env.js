// 设置后端代理基础路径
// 判断当前环境 根据不同环境调用不同的代理
const SetbaseUrl = process.env.NODE_ENV === "production" ? "/" : "/api";
export { SetbaseUrl };
