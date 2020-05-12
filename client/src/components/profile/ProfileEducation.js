import React from 'react';
import PropTypes from 'prop-types';
import DayJS from 'react-dayjs';

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, from, to, current, description },
}) => {
  return (
    <div>
      <h3 className='text-dark'>{school}</h3>
      <p>
        <DayJS format='MM/DD/YYYY'>{from}</DayJS> -{' '}
        {current ? 'Current' : <DayJS format='MM/DD/YYYY'>{to}</DayJS>}
      </p>
      <p>
        <strong>Degree: </strong>
        {degree}
      </p>
      <p>
        <strong>Field of Study: </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
