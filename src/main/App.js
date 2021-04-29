import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css'
import Routes from './routes'
import '../custom.css'
import NavBar from '../components/nav-bar';

class App extends React.Component {

  render() {
    return (
      <>
        <NavBar />
        <div className="container">
          <Routes />
        </div>
      </>
    )
  }
}

export default App;
