
window.addEventListener('load', (event) => {
    getMyList(); // get my list
    document.getElementById("list").addEventListener("input", event =>{
        setTimeout(searchToMyList, 500)}
    );
});


function searchToMyList(){
    // get value
    var input = document.getElementById("list").value;
    let books = [];
    for (let book of myList["books"]){
        if(book.title.toLowerCase().includes(input.toLowerCase()) || book.description.toLowerCase().includes(input.toLowerCase())){
            books.push(book);
        }
    }
    tmpList["books"] = books;
    outer_article.innerHTML = templates.list(tmpList);
}

var outer_article;
var myList = {};
var tmpList = {};

function getMyList() {
    // delete previous results
    outer_article = document.getElementById("list_results");
    outer_article.classList.add("list_outer");
    outer_article.style.padding = "2%";
    outer_article.innerHTML = "";

    getAllBooks(outer_article);

}

function getAllBooks(outer_article){
    let url = 'http://localhost:8080/books/list';
    let myHeaders = new Headers();
    myHeaders.append('Accept','application/json');

    let init = {
        method: "GET",
        headers: myHeaders
    }

    fetch(url, init)
    .then(response => response.json())
    .then(data =>{    
          if(data.length>0){ 
            myList["books"] = data;
            outer_article.innerHTML = templates.list(myList);
          }else{
            outer_article.innerHTML = "<p> Your list is empty </p>";
          }
        }
    )
}

function edit(selectedId){
    // render the page for editing for the book with the selectedId
    const result = myList.books.find( ({ id }) => id == selectedId );
    sessionStorage.setItem('id', result.id);
    window.location.href = "http://localhost:8080/eLib/edit.html";
}



