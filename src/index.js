// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.


// ------------- LOGIC -------------
function iterateQuotes(quotes) {
  quotes.forEach(singleQuote)
}

function singleQuote(quote) {
  const ul = document.createElement('ul')
  ul.innerHTML += `
  <br>
  <li class='quote-card'>
    <blockquote class='blockquote'>
      <p class='mb-0'>${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>0</span></button>
      <button class='btn-danger'>Delete</button>
      </blockquote>
  </li>
  `
  document.body.append(ul)
}



// -------- EVENT LISTENERS ---------
document.addEventListener("DOMContentLoaded", () => {
  fetchQuotes().then(iterateQuotes)

  const newForm = document.querySelector("#new-quote-form")
  newForm.addEventListener("submit", fetchNew)
})

// -------- FETCH REQUESTS ---------
function fetchQuotes() {
  return fetch("http://localhost:3000/quotes?_embed=likes")
  .then(resp => resp.json())
}

function fetchNew (event) {
  event.preventDefault()
  fetch("http://localhost:3000/quotes?_embed=likes", {
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
