import React from 'react';
import PropTypes from 'prop-types';
import BeerTable from './BeerTable';
import Spinner from './Spinner';

function BeerList({
  beerList,
  isLoading,
  pageNumber,
  fetchDataByPageNumber,
  match,
}) {
  if (match.params.number) {
    const { number } = match.params;

    fetchDataByPageNumber(pageNumber, Number(number));
  }

  return (
    <div div="container">
      {isLoading ? (
        <Spinner />
      ) : (
        <BeerTable beerList={beerList} pageNumber={pageNumber} />
      )}
    </div>
  );
}

BeerList.propTypes = {
  beerList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageNumber: PropTypes.number.isRequired,
  fetchDataByPageNumber: PropTypes.func.isRequired,
  match: PropTypes.shape({
    id: PropTypes.string,
    number: PropTypes.string,
  }).isRequired,
};

export default BeerList;
