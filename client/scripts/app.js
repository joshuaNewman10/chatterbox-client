var rooms = ["lobby"];
var nonConformingChars = ["<script>","</script>","<img>","<div>","</div>","</iframe>","<iframe>"]

var getMessages = function(){$.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox/?order=-createdAt',
    type: 'GET',
    data: JSON,
    contentType: 'application/json',
    success: function (data) {
      updateMessages(data.results);
      updateRooms(data.results.map(function(message){
        return message.roomname;
      }));
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  })
};

var updateRooms = function(newRooms){
  newUniqRooms = _.filter(_.uniq(_.difference(rooms.concat(newRooms), rooms)), _.identity);
  var appendRooms = '';
  $(appendRooms);
  for(var x = 0; x < newUniqRooms.length; x++){
    appendRooms += "<option value=" + newUniqRooms[x] + "'>" + newUniqRooms[x] + "</option>"
    rooms.push(newUniqRooms[x]);
  }
  $(".rooms").append($(appendRooms));
}

var updateMessages = function(messageList){
  $(".messages").html('');
  var messageDiv = '';
  $(messageDiv);
  for(var i = 0; i < messageList.length; i++){
    var currentMessage = messageList[i];
    var userName = validateInput(currentMessage.username);
    var mssg = validateInput(currentMessage.text);
    messageDiv += '<div><b>' + userName + "</b>:  " + mssg+ '</div>';
  }
  $(".messages").append($(messageDiv));
}

var validateInput = function(message){
  message = message || "";
  for(var i=0; i<nonConformingChars.length; i++) {
    message = message.replace(nonConformingChars[i], '');
  }

  return message;
}

var postMessage = function(userName, message) {
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify({username: userName, text: message}),
    contentType: 'application/json',
    success: function (data) {
      console.log(data);
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get message');
    }
  });
};

var sendMessage = function() {
  var href= document.location.href; //refactor !
  var userName = href.slice(href.indexOf('username=') + 'username='.length);
  var message = $('.userMessage').val();
  $('.userMessage').val('');
  postMessage(userName, message);
};

$(document).ready(function() {
  setInterval(getMessages,1000);
  $('.submit').on('click', sendMessage);
  $('.userMessage').keyup(function(event) {
    if ( event.keyCode === 13 ) {
      sendMessage();
    }
  });
});

