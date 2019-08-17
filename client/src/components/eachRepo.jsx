import React from 'react';
import ReactDOM from 'react-dom';

class Repo extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (<div className="repo">
      <span>User: {this.props.repo.user}</span><br></br>
      <span>Repo Name: {this.props.repo.repoName}</span><br></br>
      <span>Repo Url: {this.props.repo.repoHTMLurl}</span><br></br>
      <span>Forks #: {this.props.repo.forks}</span>
      </div>)
  }
}

export default Repo