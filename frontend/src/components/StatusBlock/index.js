import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LookupStatusContainer = styled.div`
    margin: 0 0 30px 0;
    padding: 20px;
    display: block;
    border: 1px solid grey;
`;

const StatusBlock = (props) => {
  const { message } = props;
  
  if (message) {
    return (
      <LookupStatusContainer>
        {message}
      </LookupStatusContainer>
    );
  }
  
  return null;
};

StatusBlock.propTypes = {
  message: PropTypes.string.isRequired,
}

export default StatusBlock;
