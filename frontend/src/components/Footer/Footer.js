import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__holder">
          <div className="footer__social">
            Share this
            <a href="/#" className="icon icon--facebook">
              Facebook
            </a>
            <a href="/#" className="icon icon--twitter">
              Twitter
            </a>
          </div>
          <div className="footer__spotify">
            Music by
            <a href="/#" className="icon icon--spotify">
              Spotify
            </a>
          </div>
          <div className="footer__nav">
            <nav>
              <a href="/#" alt="homepage">
                Norwergian.com
              </a>{" "}
              | <a href="/#">Terms &amp; Conditions</a> |{" "}
              <a href="/#">Cookies Policy</a>
            </nav>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
