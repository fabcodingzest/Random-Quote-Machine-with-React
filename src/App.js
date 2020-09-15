import React, { useState, useEffect } from "react";

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  // for loading icon (it does not pass Freecodecamp tests so I am commenting it out)
  const [loading, setLoading] = useState(true);

  const getData = () => {
    setLoading(true);
    const random = Math.floor(Math.random() * 360);
    fetch("https://quotes15.p.rapidapi.com/quotes/random/?language_code=en", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": "aa3a6291c8msh77028a8c7652b9fp13843ajsn991dc5ad6623"
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setQuote(data.content);
        setAuthor(data.originator.name);
        document.documentElement.style.setProperty(
          "--bg",
          `hsl(${random},100%,35%)`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="quote-box">
      {
        // uncomment these lines to show loading icon
        //loading ? <div className="loading style"></div> : (
        <div>
          <p id="text">{quote}</p>
          <p id="author">~ {author}</p>
        </div>
        // )
      }
      <div id="new-share">
        <a
          href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${encodeURIComponent(
            quote
          )}" ~${encodeURIComponent(author)}`}
          rel="noopener noreferrer"
          target="_blank"
          id="tweet-quote"
        >
          <i className="fab fa-twitter-square"></i>
        </a>
        <button onClick={getData} id="new-quote">
          New Quote
        </button>
      </div>
    </div>
  );
};
export default App;
