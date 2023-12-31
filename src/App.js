import { useEffect, useState, useCallback } from 'react';
import { addDoc, collection, doc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase-config';
import './App.css';

function App() {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, 'users');

  const addUser = useCallback(async () => {
    await addDoc(usersRef, { name: newName, age: +newAge });
  }, [newName, newAge]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers();
  }, [addUser, usersRef]);

  const handleAgeChange = async (id, age) => {
    const userDoc = doc(db, 'users', id);
    const newField = { age: age + 1 }
    await updateDoc(userDoc, newField);
  }

  const deleteUsers = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  }

  return (
    <div className="App">
     <h1>User Details</h1>
      <input className="input-field" placeholder='Name..' onChange={(event) => setNewName(event.target.value)} />
      <input className="input-field" placeholder='Age..' onChange={(event) => setNewAge(event.target.value)} />
      <button type="button" className="add-button" onClick={addUser}>Add User</button>
      <div className="user-container">
        {users.map((user) => {
          return (
            <div className="user" key={user.id}>
              <div>
                <u>Name:</u> {user.name} <br />
                <u>Age:</u> {user.age}
                <button
                  onClick={() => {
                    handleAgeChange(user.id, user.age);
                  }} className='age-button'>Edit Age
                </button>
                <button
                  onClick={() => deleteUsers(user.id)}
                  className='delete-button'>Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
