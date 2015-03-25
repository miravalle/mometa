var videoId
document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('test').innerText = 'sdfsdfsd'
    chrome.runtime.sendMessage({
        target: 'content-script'
    }, function(response) {
        console.log(response)
        videoId = response.videoId;
        document.getElementById('form').action = 'http://mometa.herokuapp.com/add/' + response.videoId
    });
    document.getElementById('submit').addEventListener("click", function() {
        var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance 
        xmlhttp.open("POST", document.getElementById('form').action);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        var params = 'metadata=' + document.getElementById('metadata').value +
            '&videoId=' + videoId
        xmlhttp.send(params);
    });
});