let url = "";
let title = "";

window.addEventListener("copy", (event) => {
  event.preventDefault();
  let html = "<a href='" + url + "'>" + title + "</a>";
  event.clipboardData.setData("text/html", html);
  let plain = title + "\n" + url;
  event.clipboardData.setData("text/plain", plain);
});

chrome.runtime.onMessage.addListener(message => {
  if (message.command != "copy") {
    return;
  }

  url = message.url;
  title = message.title;

  document.querySelector("#text").select();
  document.execCommand("copy");
});
