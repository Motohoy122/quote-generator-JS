const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote From API
let apiQuotes = [];

// Show New Quote
function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if Author field is blank and replace with unkown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length to determine the styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }
    quoteText.textContent = quote.text;
}

async function getQuote() {
    showLoadingSpinner();
    const proxyUrl = 'https://glacial-brushlands-87881.herokuapp.com/';
    const apiUrl = 'https://type.fit/api/quotes';
    try {
      const response = await fetch(proxyUrl + apiUrl);
      apiQuotes = await response.json();
      newQuote();

    removeLoadingSpinner()
    } catch (error) {
      // Catch Error Here
      alert(error);
    }
}

  // Tweet Quote
  function tweetQuote() {
      const quote = quoteText.innerText;
      const author = authorText.innerText;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
      // Opens new tab
      window.open(twitterUrl, '_blank');
  }
   
  // Event Listeners
  newQuoteBtn.addEventListener('click', getQuote);
  twitterBtn.addEventListener('click', tweetQuote);
  // On Load
  
  getQuote();
