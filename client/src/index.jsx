import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount() {
    fetch('http://localhost:1128/repos', {
      method: 'GET'
    })
    .then((data) => {
      return data.json()
    })
    .then((jsonData) => {
      console.log(JSON.stringify(jsonData));
    })
    .catch((err) => {
      console.log('err', err);
    })
  }

  search (term) {
    fetch('http://localhost:1128/repos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: term})
    })
    .then(() => {
      console.log(`${term} was searched`);
    })
    .catch((err) => {
      console.log(err);
    })

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));