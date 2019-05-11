import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Spinner from './Spinner';
import '../styles/beerDetails.scss';
import noImage from '../img/no-image.png';

function BeerDetails(props) {
  const {
    match,
    beerList,
    isLoading,
    pageNumber,
    fetchDataByPageNumber,
  } = props;

  const { id, number } = match.params;
  if (pageNumber !== number) {
    fetchDataByPageNumber(pageNumber, Number(number));
  } else if (pageNumber === 1) {
    fetchDataByPageNumber(pageNumber, Number(number));
  }

  let details;

  if (!isLoading) {
    [details] = beerList.filter(beer => beer.id === id);

    if (details) {
      if (
        details.breweries &&
        details.breweries[0].locations &&
        details.breweries[0].locations[0].streetAddress
      ) {
        details.breweryLocation =
          details.breweries[0].locations[0].streetAddress;
      } else {
        details.breweryLocation = 'N/A';
      }

      if (details.labels) {
        details.beerImage = details.labels.medium;
        details.beerIcon = details.labels.icon;
      } else {
        details.beerImage = noImage;
        details.beerIcon = noImage;
      }
    } else {
      details = {
        name: 'Beer not found',
        beerImage: noImage,
        beerIcon: noImage,
      };
    }
  }

  // return spinner if is loading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container beer-details mt-5">
      <div className="row">
        <div className="col-8">
          {/* circles row */}
          <div className="row">
            <div className="col-3 text-center">
              <p className="circle-5">
                {details.abv ? `${details.abv}%` : 'N/A'}
              </p>
              <br />
              ABV
            </div>
            <div className="col-3 text-center">
              <p className="circle-5">
                {details.ibu ? `${details.ibu}` : 'N/A'}
              </p>
              <br />
              IBU
            </div>
            <div className="col-3 text-center">
              <p className="circle-5">{details.og ? `${details.og}` : 'N/A'}</p>
              <br />
              OG
            </div>
            <div className="col-3 text-center">
              <p
                className={`circle-5 ${details.srm && 'text-white'}`}
                style={{
                  backgroundColor: `#${
                    details.srm ? details.srm.hex : '#e3dfdf'
                  }`,
                }}
              >
                {details.srm ? `${details.srm.name}` : 'N/A'}
              </p>
              <br />
              SRM
            </div>
          </div>
          {/* end of circles row */}
          <div className="row mt-5">
            <div className="col-4 beer-img">
              <img
                className="img-fluid"
                src={details.beerImage}
                alt=""
                title="fuck"
              />
            </div>
            <div className="col-8">
              <p>
                {details.description
                  ? details.description
                  : 'No description available'}
              </p>
            </div>
          </div>
        </div>
        <div className="col-4">
          <table className="table">
            <tbody>
              <tr>
                <td>Availability:</td>
                <td>
                  {details.available ? details.available.description : 'N/A'}
                </td>
              </tr>
              <tr>
                <td>Status:</td>
                <td>{details.status ? details.status : 'N/A'}</td>
              </tr>
              <tr>
                <td>Glassware:</td>
                <td>{details.glass ? details.glass.name : 'N/A'}</td>
              </tr>
              <tr>
                <td>Year:</td>
                <td>
                  {details.createDate
                    ? moment(details.createDate).format('YYYY')
                    : 'N/A'}
                </td>
              </tr>
              <tr>
                <td>Certified Organic?</td>
                <td>{details.isOrganic === 'N' ? 'No' : 'Yes'}</td>
              </tr>
            </tbody>
          </table>

          <div className="container brewed-by">
            <div className="row text-center">
              <h3 className="text-center">Brewed By</h3>
            </div>
            <br />
            <div className="media">
              <img
                className="mr-1 img-fluid"
                src={
                  details.breweries && details.breweries[0].images
                    ? details.breweries[0].images.icon
                    : '#'
                }
                alt="place holder"
              />
              <div className="media-body">
                <h5 className="mt-0">
                  {details.breweries && details.breweries[0].name}
                </h5>

                <p>{details.breweryLocation}</p>
                <h6>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={
                      details.breweries ? details.breweries[0].website : '#'
                    }
                  >
                    {details.breweries ? details.breweries[0].website : 'N/A'}
                  </a>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BeerDetails.propTypes = {
  match: PropTypes.object.isRequired,
  beerList: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  pageNumber: PropTypes.number.isRequired,
  fetchDataByPageNumber: PropTypes.func.isRequired,
};

export default BeerDetails;
