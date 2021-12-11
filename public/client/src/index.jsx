import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './components/Overview.jsx'

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h1>Project Atelier</h1>
        <Overview/>

      </div>

    )
  }

}

ReactDOM.render(<App />, document.getElementById('app'))
