'use strict'

const selectedTimespan = (state = '1D', action) => {
  switch (action.type) {
    case 'SELECT_TIMESPAN':
      return action.timespan;
    default:
      return state;
  }
};

export default selectedTimespan;