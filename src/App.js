import { collection, onSnapshot, addDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { Container, Navbar, Button, Card, Alert } from 'react-bootstrap';
import './App.css';
import localforage from 'localforage';
import db from './firebase';

function App() {

  const[item, setItem] = useState();
  const[items, setItems] = useState([]);
  const[mode, setMode] = useState();

  const onHandleSubmit = async(e) => {
    e.preventDefault();
    const collectionRef = collection(db, 'todos');
    const payload = {item: item}
    addDoc(collectionRef, payload)
  }
  

  useEffect(() => {
    onSnapshot(collection(db, 'todos'), (snapshot) => {
        if(navigator.onLine){
          let data = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
          setItems(data)
          localforage.setItem('todos', data)
        }
        else if(!navigator.onLine){
          localforage.getItem('todos').then(res => setItems(res))
        }
      })
   }
    
  , [])

  window.addEventListener('load', () => {
    setMode(navigator.onLine);
    window.addEventListener("online", () => {
      setMode(true);
    })
    window.addEventListener("offline", () => {
      setMode(false);
    })
  })



  return (
    <div>
      <Navbar bg="dark" className="shadow">
        <Container>
          <Navbar.Brand className="navbar-brand" href="#home">PWA Todo</Navbar.Brand>
        </Container>
      </Navbar>
      <div className="todo-container">
        <div>
          {
            mode===false ?
            <Alert variant={'danger'}>
              You are offline!
            </Alert> :
            null
          }
        </div>
        <form>
          <input type="search" placeholder="Add a todo" onChange={(e) => setItem(e.target.value)} required={true} />
          <br />
          <Button className="todo-add-btn shadow"  variant="primary" onClick={onHandleSubmit}>Add todo</Button>
        </form>
        {
          items.map((item) => {
            return (
              <Card key={item.id} className="todo-list-container">
                <Card.Body>
                  <div className="todo-list-item">
                    <p>{item.item}</p>
                  </div>
                </Card.Body>
              </Card>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
