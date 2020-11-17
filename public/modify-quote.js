const oldQuote = document.getElementById("old-quote");
const newQuoteContainer = document.getElementById("new-quote");

const modifyButton = document.getElementById("modify-quote-button");

let id;

window.addEventListener("load", () => {
  const regex = /\d+/g;
  id = regex.exec(window.location.search)[0];
  console.log(id);
  renderQuote(id);
});

function renderQuote(id) {
  fetch(`/api/modify-quote?id=${id}`)
    .then((response) => response.json())
    .then((jsonResp) => {
      const elem = jsonResp.data.modifyQuote;
      console.log(elem);

      const newQuote = document.createElement("div");
      newQuote.className = "single-quote";
      newQuote.innerHTML = `
      <div>      
      <div class="quote-text">"${elem.quote}"</div>
      <div class="attribution">- ${elem.person}</div>
      </div>`;
      oldQuote.appendChild(newQuote);
    });
}

const resetIdButton = () => {
  newQuoteContainer.innerHTML = "";
  oldQuote.innerHTML = "";
};

const resetModifyButton = () => {
  newQuoteContainer.innerHTML = "";
};

// Al apretar extrae el valor en los inputs de 'Quote text' & 'Person' y muestra aquellos valores modificados
modifyButton.addEventListener("click", () => {
  const idValue = id;
  const quote = document.getElementById("quote").value;
  const person = document.getElementById("person").value;

  const options = {
    method: "PUT",
    body: new URLSearchParams({
      quote: quote,
      person: person,
      id: idValue,
    }),
  };

  fetch(`/api/modify-quote`, options)
    .then((response) => response.json())
    .then((jsonResp) => {
      resetModifyButton();
      const data = jsonResp.data.modifiedElem;
      console.log(jsonResp);
      const newQuote = document.createElement("div");
      newQuote.innerHTML = `
        <h3>Congrats, your quote was Modified!</h3>

        <div class="single-quote">
        <div class="quote-text">${data.id}.  ${data.quote}</div>
        <div class="attribution">- ${data.person}</div>
        </div><br>
        <p>Go to the <a href="index.html">Home page</a> to request and view the quote modify.</p>
        `;
      newQuoteContainer.appendChild(newQuote);
    });
});
