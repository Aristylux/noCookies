console.log("load");

/*
browser.storage.local.get('updateView', function(items){
    assignTextToTextArea(items.updateView);
    //browser.storage.local.remove('updateView');
});

browser.storage.local.get('locale', function(items){
    document.getElementById(items.locale).classList.add("active");
    selectLanguage(items.locale);
});
*/

function assignTextToTextArea(newText){
    document.getElementById('hidden_element').innerHTML = newText;
}

// ---------------- Container --------------

function hideContainer(){
    //hide all
    const elements = document.querySelectorAll(".button_navigation");
    elements.forEach((btn) => btn.classList.remove("active"));

    const content_container = document.getElementById("content_container");
    const contents = content_container.getElementsByClassName("container");
    for ( content of contents){
        content.hidden = true;
    }
}

document.getElementById("nav_but_discovery").addEventListener('click', controlButtonDiscovery);
document.getElementById("nav_but_about").addEventListener('click', controlButtonAbout);
document.getElementById("nav_but_settings").addEventListener('click', controlButtonSettings);

function controlButtonDiscovery(){
    hideContainer();
    document.getElementById("discovery_container").hidden = false;
    document.getElementById("nav_but_discovery").classList.add("active");
}

function controlButtonAbout(){
    hideContainer();
    document.getElementById("about_container").hidden = false;
    document.getElementById("nav_but_about").classList.add("active");
}

function controlButtonSettings(){
    hideContainer();
    document.getElementById("settings_container").hidden = false;
    document.getElementById("nav_but_settings").classList.add("active");
}

// ---------------------- Check button ------------
var checkbox = document.getElementById("checkbox");

checkbox.addEventListener('change', function () {
  if (checkbox.checked) {
    // do this
    // add path to exluded list
    path = window.location.pathname;

    console.log('Checked');
  } else {
    
    // remove path to exluded list
    console.log('Not checked');
  }
});

console.log("End");