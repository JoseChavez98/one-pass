import { Switch, Route, BrowserRouter } from 'react-router-dom';

import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import Dashboard from './routes/Dashboard';

import 'bulma/css/bulma.min.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/" component={SignIn} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/register" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
