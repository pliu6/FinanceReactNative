'use strict'

const selectedProperty = (state = null, action) => {
  switch (action.type) {
    case 'SELECT_PROPERTY':
      return action.property;
    default:
      return state;
  }
};

export default selectedProperty;