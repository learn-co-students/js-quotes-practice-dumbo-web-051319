document.addEventListener("DOMContentLoaded", function(){
  fetchQuotes()
})


// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
// constants
const quoteList = document.querySelector("#quote-list")

//event listeners

// fetches
function fetchQuotes(){
  fetch("http://localhost:3000/quotes?_embed=likes")
  .then(resp => resp.json())
  .then(showAllQuotes)
}

// functions

function showAllQuotes(quotes){
  quotes.forEach(quote => {
    const li = document.createElement("li")
    li.className = "quote-card"
    li.innerHTML += `
      <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success' id="${quote.id}">Likes: <span>${quote.likes.length}</span></button>
      <button class='btn-danger' id="${quote.id}">Delete</button>
      </blockquote>
      </li>
      `
    quoteList.append(li)
      //addEventListener here so it can easily attach to the newly created buttons
    // const successBtn = document.querySelector(".btn-success")
    // const dangerBtn = document.querySelector(".btn-danger")
    li.addEventListener("click", eventHandler)
    // add eventHandler so we can differentiate where we click

    })
  }

function eventHandler(event){

  if (event.target.className === "btn-success"){
    console.log("success")
    //increase likes
    increaseLikes(event)

  }
  else if (event.target.className === "btn-danger"){
    console.log("DANGER! DANGER! HIGH VOLTAGE!")
    const id = event.target.id
    // console.log(event.target.id)
    fetch(`http://localhost:3000/quotes/${id}`, {
      method: 'DELETE'
    })
    .then(() => event.target.parentElement.parentElement.remove())
    // go up the chain!!! double parent elements!!!!
  }

}

function increaseLikes(event){
  console.log(event)
  const id = event.target.id
  // fetch(`http://localhost:3000/likes/`,{
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   // body: JSON.stringify({likes: })
  // })

}

//fetch(’http://localhost:3000/likes', {
// method: “POST”,
// headers: {‘Content-Type’: ‘application/json’},
// body: JSON.stringify({ quoteId: 1 })
// }).then(res => res.json()).then(console.log)
