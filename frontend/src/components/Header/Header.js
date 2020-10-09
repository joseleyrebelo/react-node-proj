import React from "react";
import { Container } from "react-bootstrap";
import logoSrc from "../../assets/images/norwegian_logo.png";

const Header = () => {
  return (
    <header className="header">
      <Container>
        <nav>
          <a href="/" className="logo">
            <img src={logoSrc} alt="Site logo" />
          </a>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
