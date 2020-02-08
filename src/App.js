import React, { Component } from 'react';
import jsonp from 'jsonp';
import rotateRight from './fa-rotate-right.png';

class App extends Component {
  state = {
    loading: true,
    text: '',
    author: ''
  };

  getQuote = () => {
    this.setState({
      loading: true,
      text: '',
      author: ''
    });

    jsonp('https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=quote', { name: 'quote' }, (err, data) => {
        if(err) {
            console.error(err.message);
        } else {
            this.setState({
                loading: false,
                text: data.quoteText,
                author: `-- ${data.quoteAuthor}`
            });
        }
    });
  };

  componentDidMount() {
    this.getQuote();
  }

  render() {
    const { loading, text, author } = this.state;
    return (
      <div className="App">
        <div id="quote-box">
          <div id="quote-copy">
            {loading ? (
              <div className="loading">
                <img
                  src={rotateRight}
                  alt="Loading..."
                />
              </div>
            ) : null}
            <div id="text">{text}</div>
            <div id="author">{author}</div>
          </div>
          <div id="quote-links">
            <a id="new-quote" className="btn" onClick={this.getQuote}>
              New Quote
            </a>

            <a
              id="tweet-quote"
              className="btn"
              href={`https://twitter.com/intent/tweet?status=${text} ${author}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tweet Quote
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
