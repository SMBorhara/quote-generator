// get quotes
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteRefresh = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loader

const loading = () => {
	loader.hidden = false;
	quoteContainer.hidden = true;
};

// hide loader
const complete = () => {
	loader.hidden = true;
	quoteContainer.hidden = false;
};

// refresh quote
const newQuotes = () => {
	loading();
	const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

	// author known check
	if (!quote.author) {
		authorText.textContent = 'Unknown';
	} else {
		authorText.textContent = quote.author;
	}

	//quote length check - font size change
	if (quote.text.length > 100) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}
	quoteText.textContent = quote.text;
	complete();
};

// get quote from site
const getQuotes = async () => {
	loading();
	const api = 'https://type.fit/api/quotes';
	try {
		const response = await fetch(api);
		apiQuotes = await response.json();
		newQuotes();
	} catch (error) {
		alert(error);
	}
};

// tweet quote - take to twitter account
const tweetQuote = () => {
	const twitterURL = `
    https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterURL, '_blank');
};

newQuoteRefresh.addEventListener('click', newQuotes);
twitterButton.addEventListener('click', tweetQuote);

getQuotes();
