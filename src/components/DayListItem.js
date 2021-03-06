import React from 'react';
import classnames from 'classnames';

import('components/DayListItem.scss');

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;

  const dayClass = classnames('day-list__item', {
    'day-list__item--selected': selected,
    'day-list__item--full': !spots,
  });

  const formatSpots = function (spots) {
    if (!spots) {
      return 'no spots remaining';
    } else if (spots === 1) {
      return '1 spot remaining';
    } else {
      return `${spots} spots remaining`;
    }
  };
  return (
    <li
      className={dayClass}
      selected={selected}
      onClick={() => setDay(name)}
      data-testid="day"
    >
      <h2 className="text--regular"> {name}</h2>
      <h3 className="text--light"> {formatSpots(spots)}</h3>
    </li>
  );
}
