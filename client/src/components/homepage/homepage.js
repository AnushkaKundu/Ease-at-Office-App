import React, { useState, useEffect } from 'react';
import './homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight, faVolumeUp} from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import Weatherapp from './weatherapp';
import Todo from './todo';
import Navbar from './Navbar';
const searchNews = async (q) => {
  q = encodeURIComponent(q);
  const response = await fetch(`https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Strict&q=${q}`, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": "f11ee4dea3msh7435ef1ce2dff95p186905jsn0a402f5a9224",
      "x-bingapis-sdk": "true"
    }
  });
  const body = await response.json();
  return body.value;
}

const Homepage = ({ username, setLoginUser }) => {
  const [query, setQuery] = useState("docker");
  const [list, setList] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    searchNews(query).then(setList);
  };

  useEffect(() => {
    // Fetch news only when the user hits "Search" or presses enter
    if (list === null) {
      return;
    }

    // Do something with the list of news
    console.log(list);
  }, [list]);

  const Item = ({ item }) => {
    const separateWords = s => s.replace(/[A-Z][a-z]+/g, '$& ').trim();
    const formatDate = s => new Date(s).toLocaleDateString(undefined, { dateStyle: 'long' });

    return (
      <li className="item">
        {item.image &&
          <img
            className="thumbnail"
            alt=""
            src={item.image?.thumbnail?.contentUrl}
          />
        }

        <h2 className="title">
          <a href={item.url}>{item.name}</a>
        </h2>

        <p className="description">
          {item.description}
        </p>

        <div className="meta">
          <span>{formatDate(item.datePublished)}</span>

          <span className="provider">
            {item.provider[0].image?.thumbnail &&
              <img
                className="provider-thumbnail"
                alt=""
                src={item.provider[0].image.thumbnail.contentUrl + '&w=16&h=16'}
              />
            }
            {item.provider[0].name}
          </span>

          {item.category &&
            <span>{separateWords(item.category)}</span>
          }
        </div>
      </li>
    );
  };
  const Quote = () => {
    const [quote, setQuote] = useState("");
    const [isReading, setIsReading] = useState(false);
  
    useEffect(() => {
      fetchQuote();
    }, []);
  
    const fetchQuote = () => {
      fetch("https://api.quotable.io/random")
        .then((res) => res.json())
        .then((data) => {
          setQuote(data.content);
        })
        .catch((error) => {
          console.log("Error fetching quote:", error);
        });
    };
  
  
    const toggleReading = () => {
      if (!isReading) {
        const utterance = new SpeechSynthesisUtterance(quote);
        window.speechSynthesis.speak(utterance);
      } else {
        window.speechSynthesis.cancel();
      }
      setIsReading(!isReading);
    };
    const copyQuote = () => {   navigator.clipboard.writeText(quote)     .then(() => {       console.log("Quote copied to clipboard");     })     .catch((error) => {       console.log("Error copying quote:", error);     }); };
    const tweetQuote = () => {
      const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}`;
      window.open(tweetUrl, "_blank");
    };
    const generateNewQuote = () => {
      fetchQuote();
    };    
    return (
      <div className="quote">
        <header>Quote of the Day.</header>
        <div className="content">
          <div className="quote-area">
            <FontAwesomeIcon icon={faQuoteLeft} className="inline-icon" size="3x" />
            <p className="q">{quote}</p>
            <FontAwesomeIcon icon={faQuoteRight} className="inline-icon" size="3x" />
          </div>
          <div className="author"></div>
        </div>
        <div className="buttons">
          <div className="features">
            <ul className="icon-list">
              <li className="sound" onClick={toggleReading}>
                <div className="circle-icon">
                  <FontAwesomeIcon icon={faVolumeUp} />
                </div>
              </li>
              <li className="copy" onClick={copyQuote}>
                <div className="circle-icon">
                  <FontAwesomeIcon icon={faCopy} />
                </div>
              </li>
              <li className="tweet">
                <div className="circle-icon" onClick={tweetQuote}>
                  <FontAwesomeIcon icon={faTwitter} />
                </div>
              </li>
            </ul>
            <button onClick={generateNewQuote}>New Quote</button>
          </div>
        </div>
      </div>
    );
  };
  
  
  return (
    <div className='outer'>
      <Navbar setLoginUser={setLoginUser}/>
      {/* <div className="button" onClick={() => setLoginUser("")}>
        Logout
      </div> */}
      <div className="toptext">
        <h2>Good Morning! {username.name}</h2>
      </div>
      <Quote/>
      <Weatherapp/>
      <Todo username={username}/>
      <div className="container appl">
        <form onSubmit={handleSearch}>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        {!list
          ? null
          : list.length === 0
            ? <p><i>No results</i></p>
            : (
              <ul>
                {list.map((item, i) => (
                  <Item key={i} item={item} />
                ))}
              </ul>
            )
        }
      </div>
    </div>
  );
}

export default Homepage;
