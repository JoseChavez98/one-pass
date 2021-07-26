import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '../../services/Login';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/credentials/credentialsSlicer';
import { AUTH_TOKEN } from '../../constants';

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [formValues, setFormValues] = useState({
    name: '',
    userName: '',
    email: '',
    password: ''
  });

  const [signup, { loading }] = useMutation(SIGNUP_MUTATION);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const { data } = await signup({
        variables: {
          ...formValues
        }
      });
      // localStorage.setItem(AUTH_TOKEN, data.signUp);
      // localStorage.setItem(CREDENTIAL_IDS, data.signIn.user.credentials);
      history.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
              <Link to="/login" className="has-text-white">
                Login
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
              Join the safest place
            </p>
            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">Name</label>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    value={formValues.name}
                    onChange={e => {
                      setFormValues({
                        ...formValues,
                        name: e.target.value
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
              <div className="has-text-centered mt-5 is-flex-direction-column">
                <button
                  className="button is-success"
                  onClick={handleSubmit}
                  type="submit"
                  value="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
