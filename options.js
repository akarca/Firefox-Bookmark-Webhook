async function saveOptions(e) {
    e.preventDefault();
    const elm = document.getElementById("submit-button");
    elm.classList.add("spinning");

    await browser.storage.sync.set({
        serverEndpoint: document.getElementById("server-endpoint").value
    });
    setTimeout(() => { elm.classList.remove("spinning") }, 500);
}
document.getElementById("server-endpoint-form").addEventListener("submit", saveOptions);

async function restoreOptions() {
    let res = await browser.storage.sync.get('serverEndpoint');
    if (res && res.serverEndpoint) {
        document.getElementById("server-endpoint").value = res.serverEndpoint;
    }
}
document.addEventListener('DOMContentLoaded', restoreOptions);