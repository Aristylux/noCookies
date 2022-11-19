console.log("load");

/* --- get data from algorithme --- */
/**
 * Set content popup cookie
 */
browser.storage.local.get("updateView", function (items) {
    console.info("updateView : " + items.updateView);
    document.getElementById("hidden_element").innerHTML = items.updateView;
    //browser.storage.local.remove('updateView');
});

/**
 * Set language
 * Test if not initailized -> set navigator language
 * Translate
 */
browser.storage.local.get("locale", function (items) {
    console.info("locale : " + items.locale);
    if(items.locale == undefined){
        items.locale = "locale_" + navigator.language[0] + navigator.language[1];
        console.log("locale: " + items.locale);
        browser.storage.local.set({locale: items.locale});
    }
    document.getElementById(items.locale).classList.add("active");
    selectLanguage(items.locale);
});

/**
 * Set website name
 * Set switch enable/disable
 */
browser.storage.local.get("websiteName", function (item) {
    console.info("websiteName : " + item.websiteName);
    document.getElementById("website").innerHTML = item.websiteName;

    let checkbox = document.getElementById("checkbox");
    checkbox.checked = false;
    browser.storage.local.get("excludedList", function (items) {
        for (i = 0; i < items.excludedList.length; i++) {
            if (items.excludedList[i] == item.websiteName)
                checkbox.checked = true;
        }
    });
});


/** 
 * Initialize excludedList of excluded websites 
 */
browser.storage.local.get("excludedList", function (items) {
    if(items.excludedList == undefined){
        console.warn("excludedList: " + items.excludedList);    //"excludedList: undefined"
        items.excludedList = [];
        browser.storage.local.set({ excludedList: items.excludedList });
    }    
});

/* ------- Definitions -------- */
/* --- Definition element Container --- */
let discovery_button = document.getElementById("nav_but_discovery");
let about_button = document.getElementById("nav_but_about");
let setting_button = document.getElementById("nav_but_settings");

/* --- Definition element Switch --- */
let checkbox = document.getElementById("checkbox");

/* --- Definition element Button --- */
let button = document.getElementById("button_delete_data");

/* ------- Events Listener -------- */
/* --- Event element Container --- */
discovery_button.addEventListener("click", controlButtonDiscovery);
about_button.addEventListener("click", controlButtonAbout);
setting_button.addEventListener("click", controlButtonSettings);


// ------ END Program ----

// ---------------- Container --------------

function hideContainer() {
    //hide all
    const elements = document.querySelectorAll(".button_navigation");
    elements.forEach((btn) => btn.classList.remove("active"));

    const content_container = document.getElementById("content_container");
    const contents = content_container.getElementsByClassName("container");
    for (content of contents) {
        content.hidden = true;
    }
}

function controlButtonDiscovery() {
    hideContainer();
    document.getElementById("discovery_container").hidden = false;
    document.getElementById("nav_but_discovery").classList.add("active");
}

function controlButtonAbout() {
    hideContainer();
    document.getElementById("about_container").hidden = false;
    document.getElementById("nav_but_about").classList.add("active");
}

function controlButtonSettings() {
    hideContainer();
    document.getElementById("settings_container").hidden = false;
    document.getElementById("nav_but_settings").classList.add("active");
}

// ---------------------- Switch button ------------

function gotWebSiteName(item) {
    browser.storage.local.get("excludedList", function (items) {
        items.excludedList.push(item.websiteName);
        console.log("list : " + items.excludedList);
        browser.storage.local.set({ excludedList: items.excludedList });
    });
}

function deleteWebSiteName(item) {
    browser.storage.local.get("excludedList", function (items) {
        for (i = 0; i < items.excludedList.length; i++) {
            if (items.excludedList[i] === item.websiteName) {
                items.excludedList.splice(i, 1);
                console.log("list : " + items.excludedList);
                browser.storage.local.set({ excludedList: items.excludedList });
            }
        }
    });
}

function onError(error) {
    console.error(error);
}


checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
        console.log("Checked");
        // add website to exluded list
        browser.storage.local.get("websiteName").then(gotWebSiteName, onError);
    } else {
        console.log("Not checked");
        // remove website to exluded list
        browser.storage.local
            .get("websiteName")
            .then(deleteWebSiteName, onError);
    }
    
    function sendMessage(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {
            command: "refresh",
        });
    }

    function reportError(error) {
        console.error(`Could not send message: ${error}`);
    }

    browser.tabs
        .query({ active: true, currentWindow: true })
        .then(sendMessage)
        .catch(reportError);
});

// ----- Button -----

button.addEventListener("click", function () {
    browser.storage.local.get("excludedList", function (items) {
        //items.excludedList = []; //reset       //browser.storage.session.clear();
        //browser.storage.local.set({ excludedList: items.excludedList });
        browser.storage.session.clear();
    });
});

console.log("End");
