import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../store/actions/post';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const CommentItem = ({
  deleteComment,
  auth,
  postId,
  comment: { _id, text, name, avatar, user, date },
}) => {
  dayjs.extend(relativeTime);

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`profile/${user}`}>
          <img className='round-img' src={avatar} alt='avatar' />
        </Link>
        <h4>{name}</h4>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>Posted on {dayjs(date).fromNow()}</p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={(e) => deleteComment(_id, postId)}
            type='button'
            className='btn btn-danger'>
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth, //porque??
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
