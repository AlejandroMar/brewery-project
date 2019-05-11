import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
} from 'react-router-dom';
import BeerList from './components/BeerList';
import BeerDetails from './components/BeerDetails';
import Hero from './components/Hero';
import Pagination from './components/Pagination';

class App extends React.Component {
  state = {
    beerList: [],
    isLoading: true,
    pagiNationArr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    pageNumber: 1,
    slicer: 4,
  };

  componentDidMount() {
    // check if user types /1 or /1/:id in url
    // there is a small problem when url has /1 on componentDidMount
    // needs to be fixed
    const regex1 = /\/1\/[\w\d]+/g;
    const regex2 = /\/1/g;
    const { location } = this.props;
    const { pathname } = location;

    if (pathname === '/' || regex1.test(pathname) || regex2.test(pathname)) {
      const { pageNumber } = this.state;
      (async () => {
        try {
          const listOfBeers = await axios.get('/api/beers/', {
            params: {
              page: pageNumber,
            },
          });
          await this.setState({
            beerList: listOfBeers.data,
            isLoading: false,
          });
        } catch (error) {
          throw error;
        }
      })();
    }
  }

  fetchDataByPageNumber = (oldNumber, newNumber) => {
    // if numbers are equal it means we allready have the data
    // so we don't need to make call
    // needs improvement to handle /1 param when componentDidMount
    if (Number(oldNumber) === Number(newNumber)) {
      return;
    }

    (async () => {
      try {
        await this.setState({ pageNumber: Number(newNumber) });
        await this.setState({ isLoading: true });

        const { pageNumber } = this.state;
        const listOfBeers = await axios.get('/api/beers/', {
          params: {
            page: pageNumber,
          },
        });

        this.setState({
          beerList: listOfBeers.data,
          isLoading: false,
        });
      } catch (error) {
        throw error;
      }
    })();
  };

  updatePaginationArr = async number => {
    // slicer: the sum added tokeep  array's items centered
    const { slicer } = this.state;
    const { pagiNationArr } = this.state;
    let newPagiNationArr = [...pagiNationArr];
    // last visible item in pagination
    const lastItem = newPagiNationArr[newPagiNationArr.length - 1];
    // first visible item in pagination
    const firstItem = newPagiNationArr[0];

    if (lastItem === number) {
      newPagiNationArr = newPagiNationArr.map(item => item + slicer);
      await this.setState({ pagiNationArr: newPagiNationArr });
    } else if (firstItem === number && firstItem !== 1) {
      newPagiNationArr = newPagiNationArr.map(item => item - slicer);
      await this.setState({ pagiNationArr: newPagiNationArr });
    }
  };

  newPageNumber = event => {
    const { name } = event.target;

    let newPageNumber;
    const { pageNumber: oldPageNumber } = this.state;
    const { pagiNationArr } = this.state;
    const newPagiNationArr = [...pagiNationArr];
    const firstItem = newPagiNationArr[0];

    /* 
      if the first item is 1 and oldPageNumber is also 1 it means
      that the next decrement will be 0 and next -1 better return 1 
    */
    if (name === 'previous' && firstItem === 1 && oldPageNumber === 1) {
      return 1;
    }
    if (name === 'next') {
      newPageNumber = oldPageNumber + 1;
    } else if (name === 'previous') {
      newPageNumber = oldPageNumber - 1;
    } else {
      newPageNumber = Number(event.target.name);
    }
    return Number(newPageNumber);
  };

  render() {
    const { beerList, isLoading, pagiNationArr, pageNumber } = this.state;

    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/" component={Hero} />
            <Route exact path="/:number" component={Hero} />
            <Route
              exact
              path="/:number/:id"
              render={props => (
                <Hero {...props} beerList={beerList} isLoading={isLoading} />
              )}
            />
          </Switch>
          <Pagination
            newPageNumber={this.newPageNumber}
            pagiNationArr={pagiNationArr}
            pageNumber={pageNumber}
            updatePaginationArr={this.updatePaginationArr}
            fetchDataByPageNumber={this.fetchDataByPageNumber}
          />

          {beerList && (
            <Route
              exact
              path="/"
              render={props => (
                <BeerList
                  {...props}
                  beerList={beerList}
                  isLoading={isLoading}
                  pageNumber={pageNumber}
                  fetchDataByPageNumber={this.fetchDataByPageNumber}
                />
              )}
            />
          )}
          {beerList && (
            <Route
              exact
              path="/:number"
              render={props => (
                <BeerList
                  {...props}
                  beerList={beerList}
                  isLoading={isLoading}
                  pageNumber={pageNumber}
                  fetchDataByPageNumber={this.fetchDataByPageNumber}
                />
              )}
            />
          )}
          <Route
            path="/:number/:id"
            render={props => (
              <BeerDetails
                {...props}
                beerList={beerList}
                isLoading={isLoading}
                fetchDataByPageNumber={this.fetchDataByPageNumber}
                pageNumber={pageNumber}
              />
            )}
          />
          <Pagination
            newPageNumber={this.newPageNumber}
            pagiNationArr={pagiNationArr}
            pageNumber={pageNumber}
            updatePaginationArr={this.updatePaginationArr}
            fetchDataByPageNumber={this.fetchDataByPageNumber}
          />
        </Router>
      </>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
};

// I need withRouter because it App is not inside a Route but it needs
// to be inside the Router in index.js
export default withRouter(App);
