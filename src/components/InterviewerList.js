import React from 'react';
import PropTypes from 'prop-types';

import InterviewerListItem from 'components/InterviewerListItem';
import('components/InterviewerList.scss');

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  // const { id, name, avatar, selected, setInterviewer} = props

  const allInterviewers = interviewers.map((item) => {
    return (
      <InterviewerListItem
        key={item.id}
        name={item.name}
        avatar={item.avatar}
        selected={item.id === value}
        setInterviewer={(e) => onChange(item.id)}
      />
    );
  });
  return (
    // <section className="interviewers interviewers__list">
    //   {allInterviewers}

    // </section>

    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        Interviewer
      </h4>
      <ul className="interviewers__list">{allInterviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
