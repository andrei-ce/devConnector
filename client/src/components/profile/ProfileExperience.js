import React from 'react';
import PropTypes from 'prop-types';
import DayJS from 'react-dayjs';

const ProfileExperience = ({
  experience: { title, company, location, from, to, current, description },
}) => {
  return (
    <div>
      <h3 className='text-dark'>
        {company}, {location ? location : null}
      </h3>
      <p>
        <DayJS format='MM/DD/YYYY'>{from}</DayJS> -{' '}
        {current ? 'Current' : <DayJS format='MM/DD/YYYY'>{to}</DayJS>}
      </p>
      <p>
        <strong>Position: </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
