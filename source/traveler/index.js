let responseText = ajaxGet(location.search.substring(1)).responseText;

let list = responseText.match(/[^\s'"]+:\/\/[^\s'"]+/g);

let resource = {};

for(let i of list) {
    try {
        let url = new URL(i);
        let pathArr = url.pathname.trim().split('/');
        let name = pathArr[pathArr.length - 1].trim().split('?')[0];
        if(name === '') continue;
        let nameArr = name.trim().split('.');
        if(nameArr.length < 2) continue;
        let type = nameArr[nameArr.length - 1];
        if(type.split(':').length > 1) continue;
        if(type === 'cn' || type === 'com' || type === 'cc' || type === 'tv' || type === 'info') continue;
        if(!resource[type]) resource[type] = [];
        resource[type].push(url.href);
    }
    catch {
        continue;
    }
}

let view = document.createElement('ul');

for(let i in resource) {
    let item = document.createElement('li');
    item.onclick = function() {
        this.className = (this.className == "") ? "open" : "";
        console.log(this.className);
    }
    item.innerText = i;
    let childrenView = document.createElement('ul');
    for(let j of resource[i]) {
        let childrenItem = document.createElement('li');
        childrenItem.innerHTML = '<a href="https://video.chaoneng.tk?' + j + '">' + j + '</a>';
        childrenView.append(childrenItem);
    }
    item.append(childrenView);
    view.append(item);
}

document.body.append(view);

function ajaxGet(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    return xhr;
}