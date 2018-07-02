import React, { Component } from 'react';

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
    fetch('https://talaikis.com/api/quotes/random/')
      .then(response => response.json())
      .then(json =>
        this.setState({
          loading: false,
          text: json.quote,
          author: `-- ${json.author}`
        })
      );
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
                  src="https://imgplaceholder.com/200x200/transparent/333/fa-rotate-right"
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
              href={`https://twitter.com/intent/tweet?status=${text} --${author}`}
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
