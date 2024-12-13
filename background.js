function handleCreated(id, bookmarkInfo) {
    browser.storage.sync.get('serverEndpoint', function(result) {
        if (result.serverEndpoint) {
            fetch(result.serverEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bookmark_id: id,
                    event: "created",
                    data: bookmarkInfo
                })
            });
        }
    });
}

browser.bookmarks.onCreated.addListener(handleCreated);


function handleChanged(id, bookmarkInfo) {
    browser.storage.sync.get('serverEndpoint', function(result) {
        if (result.serverEndpoint) {
            browser.bookmarks.get(id).then((bookmarks) => {
                fetch(result.serverEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        bookmark_id: id,
                        event: "changed",
                        data: bookmarks[0]
                    })
                });
            });
        }
    });
}

browser.bookmarks.onChanged.addListener(handleChanged)


function handleRemoved(id, removeInfo) {
    browser.storage.sync.get('serverEndpoint', function(result) {
        if (result.serverEndpoint) {
            fetch(result.serverEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bookmark_id: id,
                    event: "removed",
                    data: removeInfo["node"]
                })
            });
        }
    });
}

browser.bookmarks.onRemoved.addListener(handleRemoved);