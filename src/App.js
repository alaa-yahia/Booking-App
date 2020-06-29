/* eslint-disable no-unreachable */
import React, {useState, useEffect} from "react";
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
  const [formData, setFormData] = useState({ firstname: '', lastname: '' });
  console.log(formData)
/*   useEffect(
    () => {
      // create the store
      db.version(1).stores({ forms: 'value' });
    },
    // run effect whenever the database connection changes
    [db]
  ) */

  const handleSetName = fieldName => e => {
    const value = e.target.value;

    // update the state hook
    setFormData(prevForm => ({ ...prevForm, [fieldName]: value }));
  }

  const handleSubmit = e => {
    e.preventDefault();
    window.localStorage.setItem("1", JSON.stringify(formData));
    console.log((window.localStorage.getItem("1")));
  }

  return (
    <form onSubmit={handleSubmit}>
      <span>First name:</span>
      <br />
      <input
        type="text"
        name="firstname"
        value={formData.firstname}
        onChange={handleSetName('firstname')}
      />
      <br />
      <span>Last name:</span>
      <br />
      <input
        type="text"
        name="lastname"
        value={formData.lastname}
        onChange={handleSetName('lastname')}
      />
      <br />
      <input type="submit" value="Submit" />
      </form>
  )  
}

function Seating() {
  return <h2>Seating Page</h2>;
}

