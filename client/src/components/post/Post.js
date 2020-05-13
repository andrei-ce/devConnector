import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { Link } from 'react-router-dom';
import { getPost } from '../../store/actions/post';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.postId);
  }, [getPost, match.params.postId]);

  /// START
  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back to posts
      </Link>
      <PostItem post={post} showActions={false}></PostItem>
      <CommentForm postId={post._id} />
      <div className='comments'>
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} postId={post._id} comment={comment} />
        ))}
      </div>
    </Fragment>
  );
};
///// END

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
