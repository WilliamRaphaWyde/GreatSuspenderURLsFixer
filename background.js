chrome.action.onClicked.addListener(restoreAllTabsOriginalURLs);

function restoreAllTabsOriginalURLs(tab) {
    chrome.tabs.query(
        {},
        function(tabs) {
            tabs.forEach( function(tab) {
                //console.log("tab.id: ", tab.id);
                console.log("tab.url: ", tab.url);
                console.log("isSuspendedTab: ", isSuspendedTab(tab));
                if (isSuspendedTab(tab))
                    {
                        let newURL = originalURL(tab);
                        console.log("Original URL: ", newURL);
                        chrome.tabs.update(tab.id, {url: newURL});
                    }
            }
            )
        }
    )
};

function isSuspendedTab(tab) {
    if(tab.url.match(/^chrome-extension:\/\/.*suspended.html#.*&uri=/) == null)
        {result = false;}
    else
        {result = true;}
    return result;
};

function originalURL(tab) {
    //console.log("URL: ", tab.url);
    result = tab.url.replace(/^chrome-extension:\/\/.*suspended.html#.*&uri=/,'');
    //console.log("Original URL: ", result);
    return result;
};

