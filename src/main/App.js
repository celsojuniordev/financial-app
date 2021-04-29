import React from 'react';
import 'bootswatch/dist/flatly/bootstrap.css'
import Routes from './routes'
import '../custom.css'
class App extends React.Component {

  render() {
    return (
      <div>
        <Routes/>
      </div>
    )
  }
}

export default App;
