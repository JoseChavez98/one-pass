import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CREDENTIALS_QUERY } from '../../services/Credentials';
import CredentialCard from '../../components/CredentialCard';
import { CREDENTIAL_IDS } from '../../constants';
import CreateCredentialModal from '../../components/CreateCredentialModal';
import { AUTH_TOKEN } from '../../constants';
import { LOGOUT_MUTATION } from '../../services/Login';
import { useHistory } from 'react-router';

const Dashboard = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const creds = localStorage.getItem(CREDENTIAL_IDS);
  const { loading, error, data } = useQuery(GET_CREDENTIALS_QUERY, {
    variables: { credentialIds: creds.split(',') || [] }
  });

  const [logout] = useMutation(LOGOUT_MUTATION);

  const hideModal = (created = false) => {
    created === true && window.location.reload(false);
    setShowModal(false);
  };

  const logOut = async () => {
    try {
      logout();
      localStorage.setItem(AUTH_TOKEN, '');
      history.replace('/login');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return 'Loading...';
  if (error)
    return (
      <div className="container mt-5">
        <article className="message is-danger">
          <div className="message-header">
            <p>Something went wrong!</p>
            <button
              className="delete"
              aria-label="delete"
              onClick={() => {
                history.replace('/login');
              }}
            ></button>
          </div>
          <div className="message-body">
            <strong>Please contact support</strong>
          </div>
        </article>
      </div>
    );

  return (
    <>
      <CreateCredentialModal active={showModal} hideModal={hideModal} />
      <div className="className pt-5">
        <nav className="level">
          <div className="level-left"></div>
          <div className="level-right">
            <p className="level-item">
              <a
                className="button is-success has-text-weight-bold"
                onClick={() => setShowModal(true)}
              >
                New Credential
              </a>
            </p>
            <p className="level-item">
              <a className="button is-danger" onClick={logOut}>
                Kill session
              </a>
            </p>
          </div>
        </nav>
        <div
          // className="is-flex-wrap-wrap is-justify-content-flex-start is-flex-direction-row"
          style={{
            width: '100%',
            height: '100%',
            // border: '1',
            // borderColor: 'red'
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          {data &&
            data.credentials
              .slice()
              .reverse()
              .map((credential, index) => (
                <CredentialCard key={index} credentialObj={credential} />
              ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
