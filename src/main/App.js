import React from 'react';
import Routes from './routes'
import NavBar from '../components/nav-bar';

//css
import '../custom.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootswatch/dist/flatly/bootstrap.css';

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
