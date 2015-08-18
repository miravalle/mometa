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

function generateHTML(stuff, callback) {
    $.getJSON(chrome.extension.getURL('genres.json'), function(genres) {
        if (genres[stuff.genre]) {
            var sdf = "Genre: " + genres[stuff.genre].name + "<br>";
            parsed = JSON.parse(stuff.metadata);
            for (var i = 0; i < Object.keys(parsed).length; i++) {
                sdf += Object.keys(parsed)[i].capitalize() + ": " + parsed[Object.keys(parsed)[i]] + "<br>"
            };
            callback(sdf)
        }
        else {
            callback("Nothing here...");
        }
    });
}

var videoId = getQuerystring('v')

chrome.runtime.sendMessage({
    videoId: videoId,
    target: 'bg'
}, function(response) {
    console.log(response);
    generateHTML(response, function(s) {
        document.getElementById("mometa").innerHTML = "<br><b>Mo' Meta Data </b><br>" + s;
    })

});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
