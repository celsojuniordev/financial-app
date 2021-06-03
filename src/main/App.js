import React from 'react';
import Routes from './routes'
import NavBar from '../components/nav-bar';
import { ToastContainer } from 'react-toastify'

//css
import '../custom.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootswatch/dist/flatly/bootstrap.css';

import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

class App extends React.Component {

  render() {
    return (
      <>
        <ToastContainer />
        <NavBar />
        <div className="container">
          <Routes />
        </div>
      </>
    )
  }
}

export default App;
