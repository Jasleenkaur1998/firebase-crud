import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import './App.css';

function App() {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers();
  }, []);

  const addUser = async (e) => {
    await addDoc(usersRef, { name: newName, age: newAge });
  }

  return (
    <div className="App">
     <h1>User Details</h1>
      <input className="input-field" placeholder='Name..' onChange={(event) => setNewName(event.target.value)} />
      <input className="input-field" placeholder='Age..' onChange={(event) => setNewAge(event.target.value)}/>
      <button type="button" className="add-button" onClick={addUser}>Add User</button>
      <div className="user-container">
        {users.map((user) => {
          return (
            <div className="user" key={user.id}>
              <div><u>Name:</u> {user.name} <br /><u>Age:</u> {user.age}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
