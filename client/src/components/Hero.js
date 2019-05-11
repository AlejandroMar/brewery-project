import React from 'react';
import PropTypes from 'prop-types';
import '../styles/hero.scss';
import detailsHeromImg from '../img/details-hero.jpg';
import Spinner from './Spinner';

function Hero({ match, isLoading, beerList }) {
  const { number, id } = match.params;

  // for details route
  if (number && id) {
    const style = {
      backgroundImage: `url(${detailsHeromImg})`,
    };
    if (isLoading) {
      return (
        <div className="jumbotron text-center hero" style={style}>
          <Spinner />
        </div>
      );
    }
    let beerDetails = beerList.filter(beer => beer.id === id)[0];

    if (!beerDetails) {
      beerDetails = {
        name: 'Beer not found',
      };
    }

    return (
      <div className="jumbotron text-center hero" style={style}>
        <h1 className="">{beerDetails.name}</h1>
        {beerDetails.style && (
          <>
            <p className="">
              {beerDetails.abv ? `${beerDetails.abv}%` : ''}{' '}
              {beerDetails.style.name}
            </p>
            {beerDetails.breweries && (
              <p className="">{beerDetails.breweries[0].name}</p>
            )}
          </>
        )}
      </div>
    );
  }

  // for list route
  return (
    <div className="jumbotron text-center hero">
      <h1>Wellcome to the Brewery Api</h1>
      <p>Click on view detalil to see beer details</p>
    </div>
  );
}

Hero.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.string,
    number: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  beerList: PropTypes.array,
};
Hero.defaultProps = {
  match: {
    id: '',
    number: '',
  },
  beerList: [],
  isLoading: false,
};

export default Hero;
