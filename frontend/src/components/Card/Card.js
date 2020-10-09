import React from "react";

const Card = (props) => {
  let title = props.title;
  let body = props.body;
  return (
    <div className="card">
      <h3 className="card__title">{title}</h3>
      <div className="card__body">{body}</div>
    </div>
  );
};

export default Card;
