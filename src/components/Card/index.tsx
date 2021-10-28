import React from 'react';
import './index.scss';

interface ICard {
  url: string;
}

const Card: React.FC<ICard> = ({ url }) => {
  return (
    <div className="card">
      <img className="lazy" data-src={url} alt="" />
    </div>
  );
};

export default Card;
