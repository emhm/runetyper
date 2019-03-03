
function createElement(tagName, classes, attributes, childNodes) {
    var element = document.createElement(tagName);

    if (Array.isArray(classes)) {
        for (var i in classes) {
            element.classList.add(classes[i]);
        }
    }

    if (Array.isArray(attributes)) {
        for (var p in attributes) {
            var pair = attributes[p];
            element.setAttribute(pair[0], pair[1]);
        }
    } else if (typeof attributes === "object") {
        for (var name in attributes) {
            element.setAttribute(name, attributes[name]);
        }
    }

    if (Array.isArray(childNodes)) {
        for (var i in childNodes) {
            element.appendChild(childNodes[i]);
        }
    }

    return element;
}

function createTextNode(text) {
    return document.createTextNode(text);
}

function removeNode(node) {
    node.parentNode.removeChild(node);
}

function findOne(query) {
    switch (query.substr(0, 1)) {
        case '.':
            return document.getElementsByClassName(query.substr(1))[0];
        case '#':
            return document.getElementById(query.substr(1));
        default:
            return document.getElementsByTagName(query)[0];
    }
}

function findMany(query) {
    switch (query.substr(0, 1)) {
        case '.':
            return document.getElementsByClassName(query.substr(1));
        default:
            return document.getElementsByTagName(query);
    }
}

function findActiveChild(parent) {
    var children = parent.children;
    for (var i = 0; i < children.length; i++) {
        if (children[i].classList.contains("active")) {
            return children[i];
        }
    }
    return null;
}
