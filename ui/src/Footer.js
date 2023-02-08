import React, {Component} from 'react';
import './styles/App.css';

class Footer extends Component {

  render() {
    return (
      <footer className="footer">
        <p className="mt-3 mb-3">UzSoft LIS  {1900 + new Date().getYear()}</p>
      </footer>
    )
  }
}

export default Footer;