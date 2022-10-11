console.log("load");

browser.storage.local.get('updateView', function(items){
    assignTextToTextArea(items.updateView);
    //browser.storage.local.remove('updateView');
});

function assignTextToTextArea(newText){
    document.getElementById('hidden_element').innerHTML = newText;
}


// -> permision denied because popup (not secure)
function navigationAction(button){
    //nav
    //hide all
    const ul = document.getElementById("navigation");
    const elements = ul.getElementsByTagName("a");
    for(element of elements){
        //element.setAttribute("class", " ");
    }
    //set nav active
    //button.setAttribute("class", "active");

    //content
    //hide all
    const content_container = document.getElementById("content_container");
    const contents = content_container.getElementsByClassName("container");
    for ( content of contents){
        content.hidden = true;
    }
    //set content active
    if(button.attributes.id.value.includes("discovery")){
        document.getElementById("discovery_container").hidden = false;
    }

    if(button.attributes.id.value.includes("about")){
        document.getElementById("about_container").hidden = false;
    }

    if(button.attributes.id.value.includes("settings")){
        document.getElementById("settings_container").hidden = false;
    }
    
}