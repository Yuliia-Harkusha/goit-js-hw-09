const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),body:document.querySelector("body")};t.stopBtn.disabled=!0;t.startBtn.addEventListener("click",(()=>{t.startBtn.disabled=!0,t.stopBtn.disabled=!1,timerId=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.stopBtn.addEventListener("click",(()=>{clearInterval(timerId),t.startBtn.disabled=!1,t.stopBtn.disabled=!0}));
//# sourceMappingURL=01-color-switcher.93cc8c3d.js.map