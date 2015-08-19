$(document).ready(function() {
    initGenres();
    chrome.runtime.sendMessage({
        target: 'content-script'
    }, function(response) {
        // videoId = response.videoId;
        window.url = 'http://mometa.herokuapp.com/add/' + response.videoId
    });
    $('#submit').click(function(e) {
        console.log(getFieldJSON())
        console.log($('#genres').val());
        console.log(getFieldJSON())
        $.post(url, {
            genre: $('#genres').val(),
            metadata: getFieldJSON()
        }).done(function(stuff) {
            $('body').html('Done!');
            setTimeout(function() {
                window.close();
            }, 1500)
        })
    });
});


var initGenres = function() {
    var dropdown = $("#genres");
    $.getJSON('genres.json', function(data) {
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
    $('#lol').removeClass('hidden');
    for (var i = 0; i < arr.length; i++) {
        $('#fields').append($('<input type="text" class="field" placeholder="' + arr[i][0].toUpperCase() + arr[i].slice(1) + '" data-tag="' + arr[i] + '"/><br>'));
    };
}

var getFieldJSON = function() {
    json = {}
    for (var i = 0; i < $('.field').length; i++) {
        json[$('.field')[i].getAttribute('data-tag')] = $('.field')[i].value;
    };
    return JSON.stringify(json);
}
