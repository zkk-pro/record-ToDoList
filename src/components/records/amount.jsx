import React from 'react';

let Amount = props => (
  <div className="col">
    <div className="card">
      <div className={`card-header bg-${props.color} text-white`}>{props.text}</div>
      <div className="card-body">{props.amount}</div>
    </div>
  </div>
)

export default Amount;