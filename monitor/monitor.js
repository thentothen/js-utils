(() => {
  let start = new Date().getTime();
  var xhr = new XMLHttpRequest();

  // 拦截XHR的send方法
  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (body) {
    let start = new Date().getTime();

    // 调用原始send方法
    originalSend.apply(this, arguments);

    // 监控接口
    this.onreadystatechange = () => {
      if (this.readyState === 4 && this.status === 200) {
        if (!this.responseURL.includes('localhost:3000/m')) {
          sendData({ uri: this.responseURL, type: 'ft', duration: new Date().getTime() - start });
        }
      }
    };
  };

  window.addEventListener('error', (e) => {
    sendData({
      type: 'er',
      duration: 0,
    });
  });

  window.addEventListener('load', () => {
    // 首屏时间
    sendData({
      type: 'fp',
      duration: window.performance.timing.loadEventStart - window.performance.timing.navigationStart,
    });
  });

  function sendData(data) {
    const staticInfo = { origin: location.origin, href: location.href, date: new Date().toLocaleString() };
    xhr.open('POST', 'http://localhost:3000/m', true);
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify({ ...staticInfo, ...data }));
  }
})();
