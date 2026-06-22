// ==UserScript==
// @name        BeautyFox - Titlebar
// @author      AngelBruni
// @loadorder   3
// ==/UserScript==

function createFakeTitlebarSpace() {
    if (!navigator.userAgent.includes("Macintosh")) {
        var fakeTitlebarSpace = document.createXULElement("vbox");
        fakeTitlebarSpace.id = "fakeTitlebarSpace";
        var parentElement = document.querySelector("#navigator-toolbox");
        parentElement.parentNode.insertBefore(fakeTitlebarSpace, parentElement);
        var titlebarButtonboxContainers = document.querySelectorAll(".titlebar-buttonbox-container");
        titlebarButtonboxContainers.forEach(function(element) { fakeTitlebarSpace.appendChild(element); });
    }
}

function createTitlebar() {
    let toolboxRoot = document.getElementById("navigator-toolbox");
    let titlebarElem = document.getElementById("titlebar");
    
    // Check if titlebar is missing or doesn't contain menubar
    if (!titlebarElem) {
        console.log("Creating missing titlebar element");
        
        // Create the titlebar vbox
        titlebarElem = document.createXULElement("vbox");
        titlebarElem.id = "titlebar";
        
        // Insert at the beginning of navigator-toolbox
        toolboxRoot.insertBefore(titlebarElem, toolboxRoot.firstChild);
        
        // Move the menubar into titlebar
        let menubar = document.querySelector("#toolbar-menubar");
        if (menubar) {
            titlebarElem.appendChild(menubar);
            console.log("Moved toolbar-menubar into titlebar");
        } else {
            console.warn("toolbar-menubar not found");
        }
    } else {
        console.log("Titlebar already exists");
    }
}

// Wait for DOM to be ready
if (document.readyState === "complete" || document.readyState === "interactive") {
    createFakeTitlebarSpace();
    createTitlebar();
} else {
    document.addEventListener("DOMContentLoaded", function() {
        createFakeTitlebarSpace();
        createTitlebar();
    });
}