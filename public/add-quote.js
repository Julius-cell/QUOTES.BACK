const submitButton = document.getElementById('submit-quote');
const newQuoteContainer = document.getElementById('new-quote');

const resetQuotes = () => {
  newQuoteContainer.innerHTML = '';
};

submitButton.addEventListener('click', () => {
  const quote = document.getElementById('quote').value;
  const person = document.getElementById('person').value;

  // With this i can send the values into the body object to the server request POST as req.body
  const options = {
    method: 'POST',
    body: new URLSearchParams({
      'quote': quote,
      'person': person
    })
  }

  fetch(`/api/quotes/newquote`, options)
    .then(response => response.json())
    .then(res => {
      console.log(res.data.newQuote);
      resetQuotes();
      const newQuote = document.createElement('div');
      newQuote.innerHTML = `
    <h3>Congrats, your quote was added!</h3>

    <div class="single-quote">
    <div class="quote-text">"${res.data.newQuote.quote}"</div>
    <div class="attribution">- ${res.data.newQuote.person}</div>
    </div>
    <p>Go to the <a href="index.html">home page</a> to request and view all quotes.</p>
    `;
      newQuoteContainer.appendChild(newQuote);
    })
    .catch(err => console.log(err));
});
