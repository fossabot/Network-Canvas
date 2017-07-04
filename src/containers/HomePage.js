/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NetworkService from '../utils/NetworkService';

/**
  * Homepage screen
  * @param props {object} - children
  */
const HomePage = ({ participant }) => {
  const networkService = new NetworkService();

  return (
    <div className="container">
      <h1 >
        Welcome {participant.userProfile && participant.userProfile.name}
      </h1>
      <h3 >
        <Link to="protocol">Access sample protocol</Link>
      </h3>
    </div>
  );
};

HomePage.propTypes = {
  participant: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    network: state.network,
    participant: state.participant,
  };
}

export default connect(mapStateToProps)(HomePage);
