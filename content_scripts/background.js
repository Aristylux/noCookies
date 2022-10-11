browser.contextMenus.create({
    id: "eat-page",
    title: "Eat this page",
});

browser.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "eat-page") {
        browser.tabs.executeScript({
            file: "content_scripts/test.js",
        });
    }
});

browser.tabs.onActivated.addListener(function () {
    browser.tabs.executeScript({
        file: "content_scripts/hideCookies.js",
    });
});

browser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete" && tab.active) {
        browser.tabs.executeScript({
            file: "content_scripts/hideCookies.js",
        });
    }
    /*
    if (changeInfo.url) {
        console.log("send");
        browser.runtime.sendMessage(tab.id,{msg: changeInfo.url});
    }
    */
});
