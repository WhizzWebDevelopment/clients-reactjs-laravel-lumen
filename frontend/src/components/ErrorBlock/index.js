import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ErrorBlockContainer  = styled.div`
    margin: 0 0 30px 0;
    padding: 20px;
    display: block;
    border: 1px solid red;

    ul {
        margin: 0;
        padding: 0;
        font-size: 18px;
        color: red;
        list-style-position: inside;
    }
`;

const ErrorBlock = (props) => {
  const { errors } = props;

  if (errors.length > 0) {
    return (
      <ErrorBlockContainer>
        <ul>
          {errors.map(error => <li key={error}>{error}</li>)}
        </ul>
      </ErrorBlockContainer>
    );
  }

  return null;
}

ErrorBlock.propTypes = {
  errors: PropTypes.array.isRequired,
}

export default ErrorBlock;
