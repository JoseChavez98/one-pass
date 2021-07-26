import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CREDENTIAL_MUTATION } from '../../services/Credentials';

const CreateCredentialModal = ({ active, hideModal }) => {
  const [formValues, setFormValues] = useState({
    alias: '',
    email: '',
    userName: '',
    serviceProvider: '',
    password: ''
  });

  const [create, { loading }] = useMutation(CREATE_CREDENTIAL_MUTATION);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const { data } = await create({
        variables: { ...formValues }
      });
      hideModal(true);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={`modal ${active ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Create Credential</p>
          <button
            className="delete"
            aria-label="close"
            onClick={hideModal}
          ></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit} id="form">
            <div className="field">
              <label className="label">Alias</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Alias"
                  value={formValues.alias}
                  onChange={e => {
                    setFormValues({ ...formValues, alias: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left ">
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
              </div>
            </div>
            <div className="field">
              <label className="label">Username</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Username"
                  value={formValues.username}
                  onChange={e => {
                    setFormValues({ ...formValues, userName: e.target.value });
                  }}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Service Provider</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Ex. Google"
                  value={formValues.serviceProvider}
                  onChange={e => {
                    setFormValues({
                      ...formValues,
                      serviceProvider: e.target.value
                    });
                  }}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-store"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  value={formValues.password}
                  onChange={e => {
                    setFormValues({ ...formValues, password: e.target.value });
                  }}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>
          </form>
        </section>
        <footer className="modal-card-foot">
          <button
            className="button is-success"
            type="submit"
            value="submit"
            form="form"
          >
            Save
          </button>
          <button className="button" onClick={hideModal}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CreateCredentialModal;
