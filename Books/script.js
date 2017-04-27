  var page = document.getElementById("page");

  var titleSugestions=[]; //array for the books found
  var authorSugestions = [];
  var books = book;
  var filters = {};

//create sugestions array;
for (var i=0; i<books.length; i++){
  // console.log(books[i]);
  titleSugestions.push(books[i].title);
  authorSugestions.push(books[i].author);
}


// display the books in the page
  function displayBooks(books){
    page.innerHTML=""; // delete content from page
    for (var i = 0; i < books.length; i++) {
      var title = document.createElement("div");
      title.classList.add("title");
      var bookTitle = document.createTextNode(books[i].title);
      title.appendChild(bookTitle);
      page.appendChild(title);

      var author = document.createElement("div");
      author.className="author";
      var authorName = document.createTextNode(books[i].author);
      author.appendChild(authorName);
      page.appendChild(author);

      var description = document.createElement("div");
      description.classList.add("descr");
      var descriptionBook = document.createTextNode(books[i].description);
      description.appendChild(descriptionBook);
      page.appendChild(description);
    }
  }


displayBooks(book);

//filtered the list from output
function filterBy(key, value) {
  var output = [], tempMatch = false;
  for (var i=0; i<books.length; i++) {
    tempMatch = true;
    for (var key in filters) {
      tempMatch = tempMatch && books[i][key].toUpperCase().match(filters[key].toUpperCase());
    }
    if(tempMatch) {
      output.push(books[i]);
    }
  }
  return output;
}

//input for title
$('#title').autocomplete({
  sugestions : titleSugestions,
  onSelect : function(value){
    filters['title'] = value;
    var filteredBooks = filterBy('title', value);
    displayBooks(filteredBooks);
  }
});

//input for author
$('#auth').autocomplete({
  sugestions : authorSugestions,
  onSelect : function(value){
    filters['author'] = value;
    var filteredBooks = filterBy('author', value);
    displayBooks(filteredBooks);
  }
});

console.log(filters);
