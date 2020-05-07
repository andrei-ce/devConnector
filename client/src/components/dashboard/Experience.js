import React, { Fragment } from 'react';
import DayJS from 'react-dayjs';
import { connect } from 'react-redux';
import { deleteExperience } from '../../store/actions/profile';
import PropTypes from 'prop-types';

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td className='hide-sm'>
        <DayJS format='MM/DD/YYYY'>{exp.from}</DayJS> -{' '}
        {exp.to === null ? 'Now' : <DayJS format='MM/DD/YYYY'>{exp.to}</DayJS>}
      </td>
      <td className='hide-sm'>
        <button className='btn btn-danger' onClick={() => deleteExperience(exp._id)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
