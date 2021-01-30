/**
 * 请求后台服务接口的处理方法
 */
import { Message } from "iview";
/**
 * 外部调用此方法，传入接口最终返回数据，通过这里处理
 */
const Dispose = resultData => {
  //如果接口全部正确就返回最后数据结果
  if (
    resultData.status &&
    resultData.status === 200 &&
    resultData.data.sys_header.status === "ok"
  ) {
    return resultData.data.appdata;
  } else if (resultData.data && resultData.data.sys_header.status === "fail") {
    // 如果接口错误直接抛出错误
    Message.error(resultData.data.sys_header.message);
    return;
  } else {
    resultData.message && resultData.message != ""
      ? Message.error(resultData.message)
      : Message.error("未知错误");
    return;
  }
};

export default Dispose;
