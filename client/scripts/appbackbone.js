//model for messages

var Message = Backbone.Model.extend({
  // initialize: function(data) {

  // }
});

var Messages = Backbone.Collection.extend({
  model: Message,

  loadMsgs: function() {
    this.fetch();
  },

  url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',

  parse: function(response, options){
    return response.results;
  }

});

//view for messages

var MessagesView = Backbone.View.extend({

});

// //Model for message




//View for message
var MessageView = Backbone.View.extend({
  $el: $('.messages'),
  render: function() {
    $el.append
  }

});


//On DOM in body
  //init the app on the HTML
  //setInterval
  //new View
  //pass the correct dom nodes into "messages container"
  //view with $el

