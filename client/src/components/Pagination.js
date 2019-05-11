import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

function Pagination({
  newPageNumber,
  pagiNationArr,
  pageNumber,
  history,
  updatePaginationArr,
  fetchDataByPageNumber,
}) {
  const handleClick = event => {
    history.push('/');
    const number = newPageNumber(event);

    updatePaginationArr(number);
    fetchDataByPageNumber(pageNumber, number);
  };

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              onClick={handleClick}
              className="page-link"
              type="button"
              name="previous"
              tabIndex="-1"
            >
              Previous
            </button>
          </li>
          {pagiNationArr.map(elem => (
            <li
              key={elem}
              className={`page-item ${elem === pageNumber ? 'active' : ''}`}
            >
              <button
                onClick={handleClick}
                name={elem}
                className="page-link"
                type="button"
              >
                {elem}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              onClick={handleClick}
              name="next"
              className="page-link"
              type="button"
            >
              next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

Pagination.propTypes = {
  newPageNumber: PropTypes.func.isRequired,
  pagiNationArr: PropTypes.array.isRequired,
  pageNumber: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
  updatePaginationArr: PropTypes.func.isRequired,
  fetchDataByPageNumber: PropTypes.func.isRequired,
};

export default withRouter(Pagination);
