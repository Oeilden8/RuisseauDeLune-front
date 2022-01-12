import React from 'react';
import partenariat from '../../assets/Icons/partenariat.png';
// import alter from '../../assets/Icons/alter.png';
import caf from '../../assets/Icons/caf.png';
// import enfance from '../../assets/Icons/enfance.png';
// import eurelien from '../../assets/Icons/eurelien.png';
// import lcl from '../../assets/Icons/lcl.png';
// import pep from '../../assets/Icons/pep.png';
// import sncf from '../../assets/Icons/sncf.png';
import './Footer.scss';

function Footer() {
  return (
    <div className="Footer">
      <div className="share">
        <span className="button_share">
          <img src={partenariat} alt="logo" id="logo_footer" />
        </span>
        <nav className="nav_footer">
          <a className="footer_a" href="https://www.caf.fr/">
            <i className="fa fa-caf">
              <img src={caf} alt="logo" id="logo_footer" />
            </i>
          </a>
          <a className="footer_a" href="https://www.enfancemusique.asso.fr/">
            <i className="fa fa-enfance">
              {/* <img src={enfance} alt="logo" id="logo_footer" /> */}
            </i>
          </a>
          <a className="footer_a" href="https://www.alterincub.coop/">
            <i className="fa fa-alter">
              {/* <img src={alter} alt="logo" id="logo_footer" /> */}
            </i>
          </a>
          <a
            className="footer_a"
            href="https://www.sncf.com/fr/engagements/fondation-sncf"
          >
            <i className="fa fa-sncf">
              {/* <img src={sncf} alt="logo" id="logo_footer" /> */}
            </i>
          </a>
          <a className="footer_a" href="https://www.lespep28.org/">
            <i className="fa fa-pep28">
              {/* <img src={pep} alt="logo" id="logo_footer" /> */}
            </i>
          </a>
          <a className="footer_a" href="https://www.lcl.fr/fondation-lcl">
            <i className="fa fa-lcl">
              {/* <img src={lcl} alt="logo" id="logo_footer" /> */}
            </i>
          </a>
          <a className="footer_a" href="https://www.eurelien.fr/">
            <i className="fa fa-eurelien">
              {/* <img src={eurelien} alt="logo" id="logo_footer" /> */}
            </i>
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Footer;
