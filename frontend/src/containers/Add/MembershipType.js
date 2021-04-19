import React, { Component } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from "prop-types";

class SelectMembershipType extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.handleChange = this.handleChange.bind(this);
  }

  membershipOptions = [
    {value: '', label: 'Not a membership'},
    {value: 'silver', label: 'Silver'},
    {value: 'gold', label: 'Gold'},
    {value: 'platinum', label: 'Platinum'}
  ]

  customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '2px dotted green',
      color: state.isSelected ? 'yellow' : 'black',
      backgroundColor: state.isSelected ? 'green' : 'white'
    }),
    control: (provided) => ({
      ...provided,
      // marginTop: "5%",
      // marginLeft: "15%"
    })
  }

  handleChange(selectedOption) {
    this.props.onChange(selectedOption);
  }

  render() {
    return(
      <Select
      id="membershipType"
      onChange={this.handleChange}
      placeholder='Select membership'
      className="mt-4 col-md-4 offset-md-4"
      components={makeAnimated()}
      styles={this.customStyles}
      options={this.membershipOptions}
    />
  )}
}

SelectMembershipType.propTypes = {
  onChange: PropTypes.func
};

export default SelectMembershipType
