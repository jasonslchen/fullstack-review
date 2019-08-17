import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import Top25Repos from './components/Top25Repos.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      top25: []
    }


  }

  componentDidMount() {
    fetch('https://polar-forest-27584.herokuapp.com/repos', {
      method: 'GET',
      mode: 'no-cors'
    })
    .then((data) => {
      return data.json();
    })
    .then((jsonData) => {
      this.setState({
        repos: jsonData,
        top25: jsonData.filter((item, index) => {
          return index < 25;
        })
      });
    })
    .catch((err) => {
      console.log('err', err);
    })
  }

  search (term) {
    fetch('/repos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: term})
    })
    .then(() => {
      console.log(`${term} was searched`);
    })
    .then(() => {
       fetch('https://polar-forest-27584.herokuapp.com/repos', {
      method: 'GET',
      mode: 'no-cors'
      })
      .then((data) => {
        return data.json();
      })
      .then((jsonData) => {
        this.setState({
          repos: jsonData,
          top25: jsonData.filter((item, index) => {
            return index < 25;
          })
        });
    })
    .catch((err) => {
      console.log('err', err);
    })
    })
    .catch((err) => {
      console.log(err);
    })

  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Top25Repos top25={this.state.top25} />
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
