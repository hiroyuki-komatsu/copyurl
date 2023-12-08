let createDocumentPromise = null;

async function setupOffscreenDocument(path) {
  const filter = {
    contextTypes: ["OFFSCREEN_DOCUMENT"],
    documentUrls: [chrome.runtime.getURL(path)],
  };
  const contexts = await chrome.runtime.getContexts(filter);
  if (contexts.length > 0) {
    return;
  }

  if (createDocumentPromise) {
    await createDocumentPromise;
    return;
  }

  createDocumentPromise = chrome.offscreen.createDocument({
    url: path,
    reasons: ["CLIPBOARD"],
    justification: "for clipboard",
  });
  await createDocumentPromise;
  createDocumentPromise = null;
}

async function copyUrl(tab) {
  const message = {
    "command": "copy",
    "url": tab.url,
    "title": tab.title,
  };
  await setupOffscreenDocument("offscreen.html");
  await chrome.runtime.sendMessage(message);
}

chrome.action.onClicked.addListener(copyUrl);
