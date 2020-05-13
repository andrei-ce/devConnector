import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../store/actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost({ text });
    setText('');
  };

  return (
    <div className='post-form bg-light p'>
      <div className='pt pl'>
        <h4>Create a new post:</h4>
      </div>
      <form className='form mb-1' onSubmit={(e) => handleSubmit(e)}>
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Share some info or question...'
          required
          value={text}
          onChange={(e) => setText(e.target.value)}></textarea>
        <input type='submit' className='btn btn-dark my-1' />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
