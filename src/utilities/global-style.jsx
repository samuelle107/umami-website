import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F8F9FC;
    color: #1B1C1E;
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    line-height: 1.5;
  }

  p {
    color: #989898;
    margin: 0.5em 0;
  }

  h1 {
    margin: 8px 0;
    font-size: 3em;
  }

  h3 {
    margin: 0px 0;
    font-size: 1.25rem;
  }

  h4 {
    margin: 8px 0;
  }

  h5 {
    margin: 2px 0;
    font-weight: normal;
    font-size: 0.875rem;
  }

  a {
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: 0.3s;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 18px 0;
  }

  input {
    font-size: 0.875rem;
    box-sizing: border-box;
    -webkit-box-sizing:border-box;
    -moz-box-sizing: border-box;
    padding: 8px;
  }

  textarea {
    width: 100%;
    font-family: inherit;
    font-size: 0.875rem;
    resize: vertical;
    border: 1px solid #CCCCCC;
    padding: 8px;
  }


  // a:link {
  //   color: #A5B1C2;
  // }

  // a:visited {
  //   color: #A5B1C2;
  // }

  // a:hover { 
  //   color: #000000;
  //   border-color: black;
  // }

  // a:active {
  //   color: #A5B1C2;
  // }
`;

export default GlobalStyle;
