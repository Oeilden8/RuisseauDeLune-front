import React, { useState } from 'react';
import partenariat from '../../assets/Icons/partenariat.png';
import alter from '../../assets/Icons/alter.png';
import caf from '../../assets/Icons/caf.png';
import enfance from '../../assets/Icons/enfance.png';
import eurelien from '../../assets/Icons/eurelien.png';
import lcl from '../../assets/Icons/lcl.png';
import pep from '../../assets/Icons/pep.png';
import sncf from '../../assets/Icons/sncf.png';
import fb from '../../assets/Icons/facebook.png';
import wild from '../../assets/Icons/wild.png';
import './Footer.scss';

function Footer() {
  const [navFooterIsDisplay, setNavFooterIsDisplay] = useState(false);

  return (
    <div className="Footer">
      <div className="share">
        <span
          className="button_fb"
          style={{ opacity: navFooterIsDisplay ? 0 : 1 }}
        >
          <a
            href="https://www.facebook.com/ruisseaudelune"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={fb} alt="logo" id="logo_footer" />
          </a>
        </span>
        <span
          className="button_share"
          style={{ opacity: navFooterIsDisplay ? 0 : 1 }}
          onMouseEnter={() => setNavFooterIsDisplay(true)}
          onClick={() => setNavFooterIsDisplay(true)}
        >
          <img src={partenariat} alt="logo" id="logo_footer" />
        </span>
        <nav
          className={
            !navFooterIsDisplay ? 'nav_footer' : 'nav_footer footer_display'
          }
          onMouseLeave={() => setNavFooterIsDisplay(false)}
          onClick={() => setNavFooterIsDisplay(false)}
        >
          <a
            className="footer_a"
            href="https://www.caf.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <img src={caf} alt="logo" id="logo_footer" />
            </span>
          </a>
          <a
            className="footer_a"
            href="https://www.enfancemusique.asso.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <img src={enfance} alt="logo" id="logo_footer" />
            </span>
          </a>
          <a
            className="footer_a"
            href="https://www.alterincub.coop/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <img src={alter} alt="logo" id="logo_footer" />
            </span>
          </a>
          <a
            className="footer_a"
            href="https://www.sncf.com/fr/engagements/fondation-sncf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <img src={sncf} alt="logo" id="logo_footer" />
            </span>
          </a>
          <a
            className="footer_a"
            href="https://www.lespep28.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <img src={pep} alt="logo" id="logo_footer" />
            </span>
          </a>
          <a
            className="footer_a"
            href="https://www.lcl.fr/fondation-lcl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <img src={lcl} alt="logo" id="logo_footer" />
            </span>
          </a>
          <a
            className="footer_a"
            href="https://www.eurelien.fr/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <img src={eurelien} alt="logo" id="logo_footer" />
            </span>
          </a>
          <a
            className="footer_a"
            href="https://www.wildcodeschool.com/fr-FR"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              <img src={wild} alt="logo" id="logo_footer" />
            </span>
          </a>
        </nav>
      </div>
    </div>
  );
}

export default Footer;
