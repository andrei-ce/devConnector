import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getGithubRepos } from '../../store/actions/profile';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const ProfileGitHub = ({ githubUsername, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(githubUsername);
  }, [getGithubRepos, githubUsername]);

  return (
    <div className='profile-github p-2'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github'></i> Github Repos
      </h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repo, index) => (
          <div key={index} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>Stars: {repo.stargazers_count}</li>
                <li className='badge badge-dark'>Watchers: {repo.watchers_count}</li>
                <li className='badge badge-light'>Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ProfileGitHub.propTypes = {
  githubUsername: PropTypes.string.isRequired,
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGitHub);
