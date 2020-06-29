import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dexie from 'dexie';


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
  const db = new Dexie('FormsDatabase');
  const [formData, setFormData] = useState({ firstname: '', lastname: '' });

  useEffect(
    () => {
      // create the store
      db.version(1).stores({ forms: 'value' });
    },
    // run effect whenever the database connection changes
    [db]
  )

  const handleSetName = fieldName => e => {
    const value = e.target.value;

    // update the state hook
    setFormData(prevForm => ({ ...prevForm, [fieldName]: value }));
  }

  const handleSubmit = e => {
    e.preventDefault();
    db.forms.put({ value: String(formData)}).then (function(){
      //
      // Then when data is stored, read from it
      //
     return ( db.forms.get( String(formData))).then((x)=> console.log(Object.keys(x.value)));
    });
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

