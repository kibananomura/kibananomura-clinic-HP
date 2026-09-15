(async () => {
  const listRes = await fetch('http://localhost:9336/json');
  const list = await listRes.json();
  const target = list.find(t => t.url.includes('localhost:3000'));
  const ws = new (require('ws'))(target.webSocketDebuggerUrl);
  let id = 1;
  function send(method, params={}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (data) => {
        const msg = JSON.parse(data);
        if (msg.id === msgId) { ws.off('message', handler); resolve(msg.result); }
      };
      ws.on('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }
  ws.on('open', async () => {
    await new Promise(r => setTimeout(r, 3000));
    const result = await send('Runtime.evaluate', {
      expression: `JSON.stringify({
        innerWidth: window.innerWidth,
        localStorage_device: window.localStorage.getItem('kibana-device'),
        hasIframe: !!document.querySelector('iframe[src*="view=embed"]')
      })`,
      returnByValue: true
    });
    console.log(result.result.value);
    process.exit(0);
  });
})();
