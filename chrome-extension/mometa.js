$("#watch-description-clip").append("<div style='border-top: 1px solid #e2e2e2;' id='mometa'></div>")

function getQuerystring(key, default_) {
    if (default_ == null) default_ = "";
    key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
    var qs = regex.exec(window.location.href);
    if (qs == null)
        return default_;
    else
        return qs[1];
}
var videoId = getQuerystring('v')

chrome.runtime.sendMessage({
    videoId: videoId,
    target: 'bg'
}, function(response) {
    console.log(response)
    document.getElementById("mometa").innerHTML = "<br><b>Mo' Meta Data: </b>" + (response.metadata || "Nothing yet for this video...");
});
