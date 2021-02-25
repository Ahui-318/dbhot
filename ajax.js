/* var xhr = new XMLHttpRequest();

xhr.open('type','http://localhost:3000/');
xhr.send()
xhr.onload= function () {
  console.log(xhr.responseText);
} */
/**
 * ajax 对不同的请求方式有不同的处理规则，对不同的请求参数格式处理也不相同
 * @param {object} options 对象
 */
function ajax(options) {
  // 配置默认参数
  var defaults = {
    type: "get",
    url: "",
    data: {},
    success: function () {},
    error: function () {},
  };

  Object.assign(defaults, options);

  var xhr = new XMLHttpRequest();

  var params = "";
  for (const k in defaults.data) {
    //name=zs&age=24  第一中参数类型
    params += k + "=" + defaults.data[k] + "&";
  }

  params = params.substr(0, params.length - 1);

  //请求方式为get
  if (defaults.type == "get") {
    defaults.url = defaults.url + "?" + params;
  }

  xhr.open(defaults.type, defaults.url);
  //请求参数类型为post
  if (defaults.type == "post") {
    //对请求参数的类型进行处理
    var contentType = defaults.header["Content-Type"];
    // 在post请求方式中，必须设置请求参数的格式
    xhr.setRequestHeader("Content-Type", contentType);

    // 对参数格式进行处理
    if (contentType == "application/json") {
      // json格式的参数序需要转为字符串
      xhr.send(JSON.stringify(defaults.data));
    } else {
      //application/x-www-form-urlencoded
      xhr.send(params);
    }

    //参数写在send方法中
    xhr.send(params);
  } else {
    xhr.send();
  }

  xhr.onload = function () {
    // 如果要使用服务器返回的json对象，需要对请求头的content-type进行判断
    var contentText = xhr.getResponseHeader("Content-Type");
    var responseText = xhr.responseText;
    if (contentText.includes("application/json")) {
      responseText = JSON.parse(responseText);
    }

    // 接收成功
    if (xhr.status == 200) {
      defaults.success(xhr.responseText);
    } else {
      defaults.error(xhr.responseText, xhr);
    }
  };
}
