!function(){var t={body:document.querySelector("body"),startButton:document.querySelector("button[data-start]"),stopButton:document.querySelector("button[data-stop]")},o=null;t.stopButton.addEventListener("click",(function(){console.log("stop"),clearInterval(o),t.startButton.disabled="",t.stopButton.disabled="disabled"})),t.startButton.addEventListener("click",(function(){console.log("start"),o=setInterval((function(){var o="#".concat(Math.floor(16777215*Math.random()).toString(16));t.body.style.backgroundColor=o}),1e3),t.startButton.disabled="disabled",t.stopButton.disabled=""}))}();
//# sourceMappingURL=01-color-switcher.38a32bab.js.map