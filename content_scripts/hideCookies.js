console.log("hideCookies: start");

let data = {
    detection_cookie: false,
    hide_count: 0,
    popup_cookie_content: "nothing",
    websiteName: ""
};

let path = window.location.pathname;
data.websiteName = window.location.hostname;

console.info("Web site name : " + data.websiteName);

browser.storage.local.set({websiteName: data.websiteName});

//exclude sites
browser.storage.local.get('excludedList', function(items){
    let isExcludedSite = false;
    console.warn("item : " + items.excludedList);
    for ( i = 0; i < items.excludedList.length; i ++){
        console.warn(items.excludedList[i]);
        if(items.excludedList[i] == data.websiteName)
            isExcludedSite = true;
    }

    if (!isExcludedSite)
        search();
    else
        data.popup_cookie_content = "privilage";
});

/*
page = path.split("/").pop();
console.log(path);
console.log(page);
if (page !== "popup.html") {
    console.log("search");
    search();
} else {
    data.popup_cookie_content = "privilage";
}
*/

//Test overflow scrolling
testOverflow();

sendDataToPopup();
console.log("hideCookies: end");

// ----------------------- End Of program ---------------------

/*
function gotExcludedList(item){
    console.log("item : " + item.excludedList);

    //if(items.excludedList != undefined)
        //assignTextToTextArea(items.excludedList);
}*/

/*
 * testOverflow:
 * enable scrolling.
 */
function testOverflow() {
    //console.log(document.body.style.overflow);
    document.body.style.setProperty('overflow', 'scroll');
}

function search() {
    let body = document.getElementsByTagName("body");
    console.log(body);
    let nbr_children = body[0].childElementCount;
    let children = body[0].children;
    console.info("nbr_children: " + nbr_children);
    console.log(children);
    for (child of children) {
        if (!detectTagName(child.tagName)) {
            console.log(child);
            detectionCookie = false;
            //console.log(child.attributes);
            const attributes = child.attributes;
            for (attibute of attributes) {
                //console.log(attibute.value);
                if (detectPrimaryWord(attibute.value)) detectionCookie = true;
            }
            //if there is a detection of popup cookie
            if (detectionCookie) {
                //hide element and add stat

                //const styles = window.getComputedStyle(child); //read only

                hide(child);
            }
        }
    }
}

function detectPrimaryWord(className) {
    const keyWords = ["cookie", "consent", "gdpr", "cmp"];
    if (className == null) return false;
    for (keyWord of keyWords) {
        if (className.includes(keyWord)) return true;
    }
    return false;
}

function detectTagName(tagName) {
    const uselessTagNames = [
        "script",
        "noscript",
        "svg",
        "iframe",
        "rs-modal",
        "nav",
    ];
    for (uselessTagName of uselessTagNames) {
        if (uselessTagName === tagName.toLowerCase()) {
            return true;
        }
    }
    return false;
}

/*
 * sendDataToPopup:
 * set data in storage
 * execute popup.js
 */
function sendDataToPopup() {
    console.info(data);
    browser.storage.local.set(
        {
            updateView: data.popup_cookie_content,
        },
        function () {
            browser.tabs.excuteScript({
                file: "popup/popup.js",
            });
        }
    );
}

function hide(obj) {
    console.warn("hidden");
    data.detection_cookie = true;
    data.hide_count++;
    data.popup_cookie_content = obj.innerHTML;
    //span.style.transition = "1s";
    console.info(obj.style.display);
    //obj.hidden = true;
    obj.setAttribute("style", "display: none !important");
    //obj.style.display = "none !important";
    //if (obj.style.display !== "none") {
    //    obj.style.display = "none !important";
    //}
    console.info(obj.style.display);
}

// -------------------------------

//deprecated
function containsWordsTest(words) {
    const keyWords = ["accept", "all", "cookies", "customize", "settings"];
    let count = 0;
    for (word of words) {
        for (keyWord of keyWords) {
            if (keyWord.toLowerCase() === word.toLowerCase()) {
                count++;
            }
        }
    }
    return count;
}

//deprecated
function searchInDiv() {
    //select all <div> elements on the page
    divs = document.getElementsByTagName("div");
    console.info("div count: " + divs.length);
    detected = false;
    for (div of divs) {
        console.log(div);
        //get class
        /*
        class_div = div.getAttribute("class");
        if (class_div != null) {
            console.log(class_div);
            text = class_div.innerHTML;
            if (detectionWords(class_div) > 0 || detectionWords(text) > 0) {
                console.error(div);
                hide(div);
                //continue;
                //childs = div.childNodes;
                //console.trace(childs);
            }
        }*/

        //if contains buttons
        buttons = div.getElementsByTagName("button");
        if (buttons.length != 0) {
            //console.log(div);
            //console.log(buttons);
            for (button of buttons) {
                messageButton = button.outerText;
                //console.log(messageButton);
                const type = div.getAttribute("type");
                if (type != null) {
                    console.log(type);
                    if (detectionWords(type) > 0) detected = true;
                }

                if (detectionWords(messageButton) > 0 || detected == true) {
                    console.log(div);
                    console.log(messageButton);
                    hide(div);
                }
            }
        } else {
            text = div.innerText;
            if (text != null) {
                console.log(text);
                if (detectionWords(text) > 0 && wordsButtons(text) >= 2) {
                    hide(div);
                }
            }
        }
    }
}

//deprecated
function searchInSpan() {
    spans = document.getElementsByTagName("span");
    console.info("span count: " + spans.length);
    for (span of spans) {
        console.log(span);
        buttons = span.getElementsByTagName("button");
        inputs = span.getElementsByTagName("input");
        text = span.innerHTML;

        if (buttons.length != 0) {
            //console.log(buttons);
            for (button of buttons) {
                if (detectionWords(messageButton) > 0) {
                    hide(span);
                }
            }
        }

        if (inputs.length != 0 && detectionWords(text) > 2) {
            console.log(span);
            console.log(text);
            console.log(inputs);
            hide(span);
        }
    }
}

/*
console.info(data.detection_cookie);
console.info(data.popup_cookie_content);
console.info(data.popup_cookie_content.innerHTML);
const final_text = data.popup_cookie_content.innerHTML;
console.error(final_text);
document.getElementById("hidden_element").innerText = final_text;
if( data.detection_cookie == true){
    console.info(data.popup_cookie_content);
    //document.getElementById("hidden_element").innerHTML = data.popup_cookie_content;
    
}
*/

function detectionWords(text) {
    if (text == null) return 0;
    const keyWords = [
        "cookie",
        "privacy",
        "service",
        "partner",
        "consent",
        "data",
    ];
    let variance = 0;
    for (keyWord of keyWords) {
        result = text.includes(keyWord);
        if (result) {
            variance++;
        }
    }
    return variance;
}

function wordsButtons(text) {
    const keyWords = [
        "Manage Settings",
        "manage settings",
        "Accept",
        "accept",
        "Accept all cookies",
        "Customize settings",
        "Customise choices",
        "Accept all & visit the site",
    ];
    let variance = 0;
    for (keyWord of keyWords) {
        result = text.includes(keyWord);
        if (result) {
            variance++;
        }
    }
    return variance;
}

/*
"content_scripts": [
        {
            "matches": [
                "*://*.mozilla.org/*"
            ],
            "js": [
                "content_scripts/hideCookies.js"
            ]
        }
    ],
*/
