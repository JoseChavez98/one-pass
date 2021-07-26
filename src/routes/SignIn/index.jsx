import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../../services/Login';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/credentials/credentialsSlicer';
import { AUTH_TOKEN } from '../../constants';

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showModal, setShowModal] = useState(true);
  const [formValues, setFormValues] = useState({
    userName: '',
    email: '',
    password: '',
    verificationCode: ''
  });

  const [login] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: {
          userName: formValues.userName,
          email: formValues.email,
          password: formValues.password,
          auth: formValues.verificationCode
        }
      });
      localStorage.setItem(AUTH_TOKEN, data.signIn);
      // localStorage.setItem(CREDENTIAL_IDS, data.signIn.user.credentials);
      history.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div class={`modal ${showModal ? 'is-active' : ''}`}>
        <div class="modal-background"></div>
        <div
          class="modal-content"
          style={{
            backgroundColor: 'white',
            borderRadius: '5px',
            padding: '16px'
          }}
        >
          <div className="content">
            <h1>Important</h1>
            <p>
              We have send you a verification code to your email, please check
              also on your spam section.
            </p>
            <blockquote>
              {' '}
              We renew your verification code every 24 hours (5 a.m). Always
              check your email
            </blockquote>
          </div>
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          onClick={() => {
            setShowModal(false);
          }}
        ></button>
      </div>
      <div>
        <div className="container">
          <nav className="level">
            <div className="level-left">
              <p
                className="level-item has-text-centered is-size-1 has-text-weight-bold "
                style={{ color: '#64317f' }}
              >
                OnePass
              </p>
            </div>
            <div className="level-right">
              <p className="level-item has-text-centered">
                <Link to="/" className="has-text-white">
                  Contact
                </Link>
              </p>
              <p className="level-item has-text-centered  button is-info">
                <Link to="/register" className="has-text-white">
                  SignUp
                </Link>
              </p>
            </div>
          </nav>
        </div>
        <div className="columns mt-6">
          <div className="column is-6 is-offset-3">
            <div
              className="box"
              style={{ backgroundColor: 'rgba(220, 211, 211, 0.824)' }}
            >
              <p className="title  has-text-centered is-5 is-spaced">
                Log in to OnePass
              </p>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="text"
                      placeholder="Username"
                      value={formValues.userName}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          userName: e.target.value
                        });
                      }}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user"></i>
                    </span>
                    {/* <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span> */}
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      className="input"
                      type="email"
                      placeholder="Email"
                      value={formValues.email}
                      onChange={e => {
                        setFormValues({ ...formValues, email: e.target.value });
                      }}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                    {/* <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span> */}
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <p className="control has-icons-left">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          password: e.target.value
                        });
                      }}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-lock"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <div style={{ display: 'flex', flexdirection: 'row' }}>
                    <label className="label">Verification Code</label>
                    <span
                      class="icon is-small is-right"
                      onClick={() => setShowModal(true)}
                      style={{ cursor: 'pointer' }}
                    >
                      <i class="fas fa-info-circle"></i>
                    </span>
                  </div>
                  <p className="control has-icons-left ">
                    <input
                      className="input"
                      type="text"
                      placeholder="Code"
                      value={formValues.verificationCode}
                      onChange={e => {
                        setFormValues({
                          ...formValues,
                          verificationCode: e.target.value
                        });
                      }}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-key"></i>
                    </span>
                  </p>
                </div>
                <div className="has-text-centered mt-5 is-flex-direction-column">
                  <button
                    className="button is-success"
                    onClick={handleSubmit}
                    type="submit"
                    value="submit"
                  >
                    Log in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
