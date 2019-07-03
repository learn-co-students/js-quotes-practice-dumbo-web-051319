// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const ul = document.createElement('ul')

// ------------- LOGIC -------------
function iterateQuotes(quotes) {
  document.body.append(ul)
  quotes.forEach(singleQuote)
}

function singleQuote(quote) {
  ul.innerHTML += `
  <br>
  <li class='quote-card'>
    <blockquote class='blockquote'>
      <p class='mb-0'>${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button data-id=${quote.id} class='btn-success'>Likes: <span>0</span></button>
      <button data-id=${quote.id} class='btn-danger'>Delete</button>
      </blockquote>
  </li>
  `
  ul.addEventListener("click", handleClicks)
}

function handleClicks(event) {
  if (event.target.className === "btn-danger") {
    fetchDeleteQuote(event)
  }
  if (event.target.className === "btn-success") {
    fetchCreateLike(event)
  }
}

function updateLikesDom(data, event) {
  const oldLike = parseInt(event.target.children[0].innerText)
  const newLike = oldLike + 1
  event.target.children[0].innerText = newLike
}

// function calculateLikes(quote) {
//   // debugger
//    return fetchLikes()
//    .then(likes => {grabLikes(likes, quote)})
// }
//
// function grabLikes(likes, quote) {
//   // debugger
//   const count = likes.filter(like => like.quoteId === quote.id).length
//   return count
// }

// function mathLikes(likes, quote) {
//
//   const count = likes.filter(like => like.quoteId === quote.id).length
//   return count
//   // debugger
// }


// -------- EVENT LISTENERS ---------
document.addEventListener("DOMContentLoaded", () => {
  fetchQuotes().then(quotes => {iterateQuotes(quotes, ul)})

  const newForm = document.querySelector("#new-quote-form")
  newForm.addEventListener("submit", fetchNew)
})

// -------- FETCH REQUESTS ---------
function fetchQuotes() {
  return fetch("http://localhost:3000/quotes")
  .then(resp => resp.json())
}

function fetchNew (event) {
  event.preventDefault()
  fetch("http://localhost:3000/quotes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "quote": event.target[0].value,
      "author": event.target[1].value
    })
  })
  .then(resp => resp.json())
  .then(singleQuote)
}

function fetchDeleteQuote(event) {
  // debugger
  const id = event.target.dataset.id
  fetch(`http://localhost:3000/quotes/${id}`, {
    method: "DELETE"
  })
  event.path[2].remove()
}

function fetchCreateLike(event) {
  const quoteId = parseInt(event.target.dataset.id)
  fetch("http://localhost:3000/likes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "quoteId": quoteId,
      "createdAt": Date.now()
    })
  })
  .then(resp => resp.json())
  .then(like => {updateLikesDom(like, event)})
}

// function fetchLikes() {
//   return fetch("http://localhost:3000/likes")
//   .then(resp => resp.json())
//   // .then(likes => {mathLikes(likes, quote)})
// }
