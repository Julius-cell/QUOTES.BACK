const fetchAllButton = document.getElementById("fetch-quotes");
const fetchRandomButton = document.getElementById("fetch-random");
const fetchByAuthorButton = document.getElementById("fetch-by-author");
const deleteButton = document.getElementById("trash");

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.querySelector(".quote");
const attributionText = document.querySelector(".attribution");

const resetQuotes = () => {
  quoteContainer.innerHTML = "";
};

const renderError = (response) => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
};

const renderQuotes = (quotes = []) => {
  resetQuotes();
  if (quotes.length > 0) {
    quotes.forEach((quote) => {
      const newQuote = document.createElement("div");
      newQuote.className = "single-quote";
      newQuote.innerHTML = `
      <div class="wrap-info">      
      <div class="quote-text">"${quote.quote}"</div>
      <div class="attribution">- ${quote.person}</div>
      </div>
      <div class="wrap-tools">
      <button class="modify" id="trash" onclick="deleteQuote(${quote.id})"><ion-icon name="trash-outline"></ion-icon></button>
      <button class="modify"><a href="/modify-quote?id=${quote.id}"><ion-icon name="pencil-outline"></ion-icon></a></button>
      </div>`;
      quoteContainer.appendChild(newQuote);
    });
  } else {
    quoteContainer.innerHTML = "<p>Your request returned no quotes.</p>";
  }
};

const getAllQuotes = async () => {
  try {
    const response = await fetch("/api/quotes");
    console.log(response);
    const jsonRes = await response.json();
    renderQuotes(jsonRes.data.quotes);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

function deleteQuote(id) {
  console.log(id);
  fetch(`/api/quotes?id=${id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(jsonResponse => {
      resetQuotes();
    })
    .catch((err) => console.log(err));
}

fetchAllButton.addEventListener("click", () => {
  getAllQuotes();
});

fetchRandomButton.addEventListener("click", () => {
  fetch("/api/quotes/random")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        renderError(response);
      }
    })
    .then((response) => {
      console.log(response.data.quote);
      renderQuotes(response.data.quote);
    });
});

fetchByAuthorButton.addEventListener("click", () => {
  const author = document.getElementById("author").value;
  fetch(`/api/quotes/author?person=${author}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        resetQuotes();
        quoteContainer.innerHTML = "<p>Your request returned no quotes.</p>";
      }
    })
    .then((response) => {
      console.log(response.data.quote);
      renderQuotes(response.data.quote);
    })
    .catch((err) => console.log(err));
});