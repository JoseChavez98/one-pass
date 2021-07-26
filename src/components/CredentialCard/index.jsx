import { useState } from 'react';

const CredentialCard = ({ credentialObj }) => {
  const [showPlaceHolder, setShowPlaceHolder] = useState(false);
  return (
    <div
      className="box m-3"
      style={{
        backgroundColor: 'rgba(220, 211, 211, 0.824)',
        width: '18rem',
        height: 'auto'
      }}
    >
      <div className="card-image">
        <figure className="image is-4by3">
          {showPlaceHolder ? (
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt=""
            />
          ) : (
            <img
              src={`https://logo.clearbit.com/${credentialObj.serviceProvider}.com?size=250`}
              onError={() => {
                setShowPlaceHolder(true);
              }}
              alt=""
            />
          )}
        </figure>
      </div>
      <div className="card-content">
        <div
          className="is-flex-direction-row is-justify-content-space-between has-text-weight-light mb-2"
          style={{ wordWrap: 'break-word' }}
        >
          <span className="has-text-weight-light">Alias:</span>{' '}
          <span className="has-text-weight-bold">{credentialObj.alias}</span>
        </div>
        <div
          className="is-flex-direction-row is-justify-content-space-between has-text-weight-medium"
          style={{ wordWrap: 'break-word' }}
        >
          <span className="has-text-weight-light">Email:</span>{' '}
          <span className="has-text-weight-bold">{credentialObj.email}</span>
        </div>
        <div
          className="is-flex-direction-row is-justify-content-space-between has-text-weight-medium"
          style={{ wordWrap: 'break-word' }}
        >
          <span className="has-text-weight-light">User name:</span>{' '}
          <span className="has-text-weight-bold">{credentialObj.userName}</span>
        </div>
        <div
          className="is-flex-direction-row is-justify-content-space-between has-text-weight-bold"
          style={{ wordWrap: 'break-word' }}
        >
          <span className="has-text-weight-light">Password:</span>{' '}
          <span className="has-text-weight-bold">{credentialObj.password}</span>
        </div>
      </div>
    </div>
  );
};

export default CredentialCard;
