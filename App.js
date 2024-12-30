import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState('');

  // Backend URL
  const backendUrl = 'https://traders28-production.up.railway.app/api/data';

  // Fetch all data
  useEffect(() => {
    axios.get(backendUrl)
      .then(response => setData(response.data || []))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Add new data
  const handleAddData = () => {
    if (!input) return;
    axios.post(backendUrl, { name: input })
      .then(() => {
        setInput('');
        axios.get(backendUrl).then(response => setData(response.data));
      })
      .catch(error => console.error('Error adding data:', error));
  };

  // Delete data
  const handleDelete = (id) => {
    axios.delete(`${backendUrl}/${id}`)
      .then(() => setData(data.filter(item => item.id !== id)))
      .catch(error => console.error('Error deleting data:', error));
  };

  // Edit data
  const handleEdit = (id) => {
    const newName = prompt('Enter new name:');
    if (newName) {
      axios.put(`${backendUrl}/${id}`, { name: newName })
        .then(() => {
          const updatedData = data.map(item =>
            item.id === id ? { ...item, name: newName } : item
          );
          setData(updatedData);
        })
        .catch(error => console.error('Error editing data:', error));
    }
  };

  return (
    <div>
      <h1>My React App</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleEdit(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter data"
      />
      <button onClick={handleAddData}>Add Data</button>
    </div>
  );
}

export default App;
