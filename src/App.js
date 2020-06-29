import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Booking Page</Link>
            </li>

            <li>
              <Link to="/seating">Seating page</Link>
            </li>

          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/seating">
            <Seating />
          </Route>
          <Route path="/">
            <Booking />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Booking() {
  return <h2>Booking Page</h2>;
}

function Seating() {
  return <h2>Seating Page</h2>;
}

