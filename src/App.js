import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const response = await axios({
      method: "GET",
      url: "https://quotes15.p.rapidapi.com/quotes/random/",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": "aa3a6291c8msh77028a8c7652b9fp13843ajsn991dc5ad6623",
        useQueryString: true
      },
      params: {
        language_code: "en"
      }
    }).catch((err) => {
      console.log(err);
    });
    setLoading(false);
    setQuote(response.data.content);
    setAuthor(response.data.originator.name);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="quote-box">
      {loading ? (
        <div className="loading style"></div>
      ) : (
        <div>
          <p id="text">{quote}</p>
          <p id="author">~ {author}</p>
        </div>
      )}
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
