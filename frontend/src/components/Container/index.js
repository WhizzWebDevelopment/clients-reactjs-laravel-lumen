import styled from 'styled-components';

const Container = styled.main`
  width: 80%;
  margin: 50px auto;
  padding: 30px;
  display: block;
  background-color: white;

  h1, h2 {
    margin: 0 0 30px 0;
    padding: 0;
    text-align: center;
  }

  button {
    margin: 0 auto;
    padding: 10px;
    display: block;
    font-size: 32px;
    cursor: pointer;
  }

  a.react-router-button {    
    text-decoration: none;
  }

  label {
    margin: 0 0 15px 0;
    display: block;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }

  input[type="text"] {
    width: 30%;
    margin: 0 auto 30px auto;
    padding: 10px;
    display: block;
    font-size: 16px;
  }

  table {
    margin: 0 auto 30px auto;
    border-collapse: collapse;

    td {
      padding: 15px;
      border: 1px solid black;
    }
  }
`;

export default Container;
