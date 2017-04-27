
//search match in books
$.fn.autocomplete = function(opts) {

  var defaults = {   //save suggestions in an default object
    sugestions : [],
    onSelect : function(){}
  }

  var options = $.extend({},defaults, opts);  // save options in defaults, and defaults in empty object

  var $input = this;

  var $ul = $('<ul></ul>');       //create element ul
  // $ul.append('<li>Book</li>'); //create list li
  $ul.append('<li>'+$input.val()+'</li>'); //add content to li
  $input.after($ul);

//create li list
  function createChildList(val){
    var $li = $('<li>'+val+'</li>');
    $li.attr('search-key',val);
    $ul.append($li);
  }

// handle the keyup event on input field
  $input.bind('keyup', function(){
    var results = [];  //results of search
    $ul.slideDown();
    var myPattern = $input.val().toUpperCase();
    $ul.find('li').remove();    //delete content from list

    for (var i = 0; i < options.sugestions.length; i++) {
      if (myPattern == "") {  //if field of search is empty
        results = [];
      }
      else  if (options.sugestions[i].toUpperCase().match(myPattern)  ) {
        results.push(options.sugestions[i]);
        createChildList(options.sugestions[i]);
      }
    }
});

//handle the keyup event on list ul
  $ul.click(function(event){
    if (event.target.tagName === "LI") {
        var $li = $(event.target);
        var value = $li.attr('search-key');  //take content from li
        $input.val(value);   //change value from input
        $ul.html("");
        options.onSelect(value);  
    }
  })

};
