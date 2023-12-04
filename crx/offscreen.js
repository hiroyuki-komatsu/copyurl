let url = "";
let title = "";

window.addEventListener("copy", (event) => {
  console.log("event listener");
  event.preventDefault();
  let html = "<a href='" + url + "'>" + title + "</a>";
  event.clipboardData.setData("text/html", html);
  let plain = title + "\n" + url;
  event.clipboardData.setData("text/plain", plain);
});

chrome.runtime.onMessage.addListener(message => {
  console.log("message: " + message);
  if (message.command != "copy") {
    return;
  }
  console.log("url: " + message.url);
  console.log("title: " + message.title);

  url = message.url;
  title = message.title;

  document.querySelector("#text").select();
  document.execCommand("copy");
});
