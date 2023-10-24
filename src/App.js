import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const usersRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersRef)
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getUsers();
  }, []);

  return (
    <div className="App">
     <h1>User Details</h1>
        {users.map((user) => {
          return <div>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
          </div>
        })}
    </div>
  );
}

export default App;
