import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dexie from 'dexie';


export default function App() {
  const db = new Dexie('FormsDatabase');
  useEffect(
    () => {
      db.version(1).stores({ forms: '++id' });
    },
    [db]
  )
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

        <Switch>
          <Route path="/seating">
            <Seating db={db}/>
          </Route>
          <Route path="/">
            <Booking db={db} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Booking({db}) {
  
  const [formData, setFormData] = useState({ firstname: '', lastname: '' });

  const handleSetName = fieldName => e => {
    const value = e.target.value;

    // update the state hook
    setFormData(prevForm => ({ ...prevForm, [fieldName]: value }));
  }

  const handleSubmit = e => {
    e.preventDefault();
    db.table('forms').add(formData);
    setFormData({firstname: '', lastname: '' });

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

function Seating({db}) {
  const [formsData, setFormsData] = useState([]);

  useEffect( () => {
    
    db.table('forms')
    .toArray()
    .then((todos) => {
      setFormsData( todos );
    });

  },[db]);

    return (
      <div>
        {formsData.map((item, index) => 
          (<div key={index}>
            <p>{item.firstname}</p>
            <p>{item.lastname}</p>
            <br/>
          </div>))
        }
      </div>
      )
}