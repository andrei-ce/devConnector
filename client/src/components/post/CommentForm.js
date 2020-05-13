import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../store/actions/post';

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment({ text }, postId);
    setText('');
  };
  //=========/START/==========//
  return (
    <div className='post-form bg-light p'>
      <div className='pt pl'>
        <h4>Leave a comment...</h4>
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
  //=========/END/============//
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
