import React from 'react';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  return (
    <div>
      <a href={props.url}>{props.name}</a>
      <span>Stars count: {props.stargazers}</span>
    </div>
  );
};

ListItem.propTypes = {
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stargazers: PropTypes.number.isRequired
};

export default ListItem;
