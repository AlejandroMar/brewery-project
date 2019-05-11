import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function BeerTable(props) {
  const { beerList, pageNumber } = props;

  return (
    <div className="container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">icon</th>
            <th scope="col">Name</th>
            <th scope="col">Abv</th>
            <th scope="col">Ibu</th>
          </tr>
        </thead>
        <tbody>
          {beerList.map(beer => (
            <tr key={beer.id}>
              <td>
                <Link to={`/${pageNumber}/${beer.id}`}>
                  <img src={beer.labels ? beer.labels.icon : '#'} alt="" />
                </Link>
              </td>
              <td>
                <Link to={`/${pageNumber}/${beer.id}`}>{beer.name}</Link>
              </td>
              <td>{beer.abv || 'N/A'}</td>
              <td>{beer.ibu || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

BeerTable.propTypes = {
  beerList: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
};

export default BeerTable;
