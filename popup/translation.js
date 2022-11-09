
let buttons_lang = document.querySelectorAll(".button_language");

buttons_lang.forEach(function (button) {
    button.addEventListener("click", () => {
        buttons_lang.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
        //browser.storage.local.set({locale: button.id});
        selectLanguage(button.id);
    });
});

function selectLanguage(lang){
    switch (lang) {
        case "locale_fr":
            setLanguage(locale_fr);
            break;
        case "locale_en":
            setLanguage(locale_en);
            break;
    }
}

function setLanguage(language) {
    console.log(language);
    const elements = document.getElementsByClassName("translate");
    for(i = 0; i < elements.length; i++){
        if(elements[i].tagName == "P")
            elements[i].innerHTML = language[elements[i].id];
        else
            elements[i].textContent = language[elements[i].id];
    }
}