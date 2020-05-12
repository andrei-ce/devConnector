import React, { Fragment } from 'react';
import DayJS from 'react-dayjs';
import { connect } from 'react-redux';
import { deleteEducation } from '../../store/actions/profile';
import PropTypes from 'prop-types';

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td className='hide-sm'>
        <DayJS format='MM/DD/YYYY'>{edu.from}</DayJS> -{' '}
        {edu.to === null ? 'Now' : <DayJS format='MM/DD/YYYY'>{edu.to}</DayJS>}
      </td>
      <td>
        <button className='btn btn-danger' onClick={() => deleteEducation(edu._id)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
