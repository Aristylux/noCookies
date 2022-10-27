console.log("load");

/*
browser.storage.local.get('updateView', function(items){
    assignTextToTextArea(items.updateView);
    //browser.storage.local.remove('updateView');
});
*/

function assignTextToTextArea(newText){
    document.getElementById('hidden_element').innerHTML = newText;
}

function hideContainer(){
    //hide all
    const elements = document.getElementById("navigation").getElementsByTagName("a");
    for(element of elements){
        element.setAttribute("class", " ");
    }

    const content_container = document.getElementById("content_container");
    const contents = content_container.getElementsByClassName("container");
    for ( content of contents){
        content.hidden = true;
    }
}

document.getElementById("nav_but_discovery").addEventListener("click", controlButtonDiscovery);
document.getElementById("nav_but_about").addEventListener("click", controlButtonAbout);
document.getElementById("nav_but_settings").addEventListener("click", controlButtonSettings);

function controlButtonDiscovery(){
    hideContainer();
    document.getElementById("discovery_container").hidden = false;
    document.getElementById("nav_but_discovery").setAttribute("class", "active");
}

function controlButtonAbout(){
    hideContainer();
    document.getElementById("about_container").hidden = false;
    document.getElementById("nav_but_about").setAttribute("class", "active");
}

function controlButtonSettings(){
    hideContainer();
    document.getElementById("settings_container").hidden = false;
    document.getElementById("nav_but_settings").setAttribute("class", "active");
}


console.log("End");