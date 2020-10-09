import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../Card/Card";

const Body = () => {
  const [cardsStates, setCards] = useState({
    entries: null,
    lastIndex: null,
    loadCounts: 0,
    ctaCardVisible: null,
    isLoading: false,
  });

  const getCards = (index, emulateDelay = false) => {
    setCards({ ...cardsStates, isLoading: true });
    axios({
      method: "get",
      url: `http://localhost:5000/${index}${
        emulateDelay ? "?emulate_delay=1" : ""
      }`,
      responseType: "json",
    })
      .then((response) => {
        let { entries, sliceEnd } = response.data;
        let sortedEntries = entries;
        let ctaCardVisibility = true;
        if (cardsStates.loadCounts === 0) {
          // Account for 1st load having only 5 slots
          // - due to the "card--cta"
          // - Adjusts index to -1 so the 6th item can be show on the next load
          sortedEntries.pop();
          sliceEnd -= 1;
        } else {
          ctaCardVisibility = false;
        }
        setCards(() => ({
          ...cardsStates,
          entries,
          lastIndex: sliceEnd,
          loadCounts: cardsStates.loadCounts + 1,
          ctaCardVisible: ctaCardVisibility,
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const initGetCards = () => {
    getCards(0);
  };

  const getMoreCards = () => {
    getCards(cardsStates.lastIndex, true);
  };

  useEffect(initGetCards, []);

  return (
    <div className="banner">
      <div className="contain">
        <Container>
          <Row>
            <Col xs={12} md={5} className="banner__left">
              <h1 className="banner__title">The sounds of Spain...</h1>
              <div className="banner__text">
                <p>
                  Whether you're turning up the tunes in Tenerife, bouncing to
                  the beat in Barcelona or moving to the music in Madrid, we've
                  got you covered.
                </p>
                <p>
                  You'll also have the opportunity to win a 5 day trip to Spain,
                  courtesy of Norwegian!
                </p>
                <button className="banner__cta" onClick={getMoreCards}>
                  M0re please
                  <span
                    className={`icon icon--refresh ${
                      cardsStates.isLoading && cardsStates.loadCounts >= 1
                        ? "active"
                        : ""
                    }`}
                  ></span>
                </button>
              </div>
            </Col>
            <Col xs={12} md={7} className="cards">
              <div className="cards__holder">
                {cardsStates.ctaCardVisible && (
                  <div key="cardspecial" className="card card--cta">
                    <h2 className="card__text">
                      Chose a <br />
                      Destination <br />
                      <span className="icon icon--proceed"></span>
                    </h2>
                  </div>
                )}
                {cardsStates.entries &&
                  cardsStates.entries.map((row, id) => (
                    <Card key={id} title={row.title} body={row.body} />
                  ))}
              </div>
              <a href="/#" className="banner__terms-link">
                * terms &amp; conditions apply
              </a>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Body;
