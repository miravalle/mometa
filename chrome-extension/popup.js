var videoId
document.addEventListener("DOMContentLoaded", function() {
    initGenres();
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

var initGenres = function() {
    var dropdown = $("#genres");
    $.getJSON('genres.json', function(data) {
        console.log(data);
        for (var key in data) {
            dropdown.append($('<option>' + data[key].name + '</option>')
                .attr({
                    value: key
                })
                .addClass("text")
            );
        };
        dropdown.change(function(e) {
            setFields(data[$('#genres').val()].fields);
        });
    })
}

var setFields = function(arr) {
    $('#fields').html('');
    for (var i = 0; i < arr.length; i++) {
        $('#fields').append($('<input type="text" class="field" placeholder="'+arr[i][0].toUpperCase() + arr[i].slice(1) + '" data-tag="'+arr[i]+'"/>'));
    };
}
