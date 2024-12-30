require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } = require('firebase/firestore');

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrhCsIyL-jw774klvCEYKUnI0s8SujnE4",
    authDomain: "test-234ee.firebaseapp.com",
    databaseURL: "https://test-234ee-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-234ee",
    storageBucket: "test-234ee.firebasestorage.app",
    messagingSenderId: "954989877102",
    appId: "1:954989877102:web:00a096f0cfec3d276d937f"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);

// Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// API Routes

// Get all data
app.get('/api/data', async (req, res) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'data'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add new data
app.post('/api/data', async (req, res) => {
    try {
        const newData = req.body;
        const docRef = await addDoc(collection(db, 'data'), newData);
        res.status(201).json({ id: docRef.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update data
app.put('/api/data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        await updateDoc(doc(db, 'data', id), updatedData);
        res.status(200).send('Document successfully updated!');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete data
app.delete('/api/data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await deleteDoc(doc(db, 'data', id));
        res.status(200).send('Document successfully deleted!');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
