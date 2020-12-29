import React, { Component } from 'react';
import { Header } from '../src/shared/Header'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import 'App.css';

import { Provider } from 'react-redux'
import RentalListing from 'components/rental/rental-listing/RentalListing'
import RentalDetails from 'components/rental/rental-detail/RentalDetails'

const store = require('./reducers').init()

class App extends Component {



  render() {

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className='App'>
            <Header />
            <div className='container'>
              <Route exact path='/' render={() => <Redirect to='/rentals' />} />
              <Route exact path='/rentals' component={RentalListing} />
              <Route exact path='/rentals/:id' component={RentalDetails} />

            </div>
          </div>
        </BrowserRouter>
      </Provider>
    )
  }

}
export default App;
