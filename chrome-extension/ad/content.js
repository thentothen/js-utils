
const timer = {}
// 简书
if (location.href.includes("jianshu")) {
  $("._2OwGUo").children(":last-child").css("display", "none");
  $("._3Pnjry").css("display", "none");

   timer.jianshu = null;

  let start = () => {
    if (timer.jianshu) return;
    timer.jianshu = setInterval(() => {
      $("._23ISFX-close")?.click();
    }, 500);
  };
  let end = () => clearInterval(timer.jianshu);

  function onFocus() {
    console.log("页面激活");
    // 执行页面激活时的代码
    start();
  }
  function onBlur() {
    console.log("页面非激活");
    // 执行页面非激活时的代码
    end();
  }

  window.onload = function () {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
  };
}

// CSDN
if (location.href.includes("csdn")) {
  $("#asideWriteGuide").css("display", "none");

  var myId = "google_ads"; // 要匹配的ID部分文本

   timer.csdn = null;

  let start = () => {
    if ( timer.csdn ) return;

    timer.csdn  = setInterval(() => {
      $(".passport-login-tip-container")?.css("display", "none");
      $("#passportbox > img")?.click();
      $('.programmer1Box').css('display', 'none');
      $('.box-shadow.mb8').css('display', 'none');
      $('#recommendAdBox').css('display', 'none');
      $('#footerRightAds').css('display', 'none');
    }, 500);
  };
  let end = () => clearInterval( timer.csdn );
  function onFocus() {
    console.log("页面激活");
    // 执行页面激活时的代码
    start();
  }
  function onBlur() {
    console.log("页面非激活");
    // 执行页面非激活时的代码
    end();
  }

  window.onload = function () {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
  };
}

//知乎
if (location.href.includes("zhihu")){
  
   timer.zhifu = null;
  let start = () => {
    if (timer.zhifu) return;

    timer.zhifu = setInterval(() => {
      $(".css-1wq6v87").css('display', 'none');
      $(".Button.Modal-closeButton.Button--plain")?.click();
    }, 500);
  };
  let end = () => clearInterval(timer.zhifu);
  function onFocus() {
    console.log("页面激活");
    // 执行页面激活时的代码
    start();
  }
  function onBlur() {
    console.log("页面非激活");
    // 执行页面非激活时的代码
    end();
  }

  window.onload = function () {
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
  };
}

chrome.runtime.onMessage.addListener((message, sender, sendBack)=>{
  if(message.action === 'cancle'){
    clearInterval(timer[message?.data])
    sendBack({message: 'ok'})
  }
  console.log(message, sender, sendBack);
})
console.log("插件加载成功");
