import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    fetch("/api/test")
      .then(res => res.json())
      .then(data => setApiMessage(data.message))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Home Page</h2>
      <p>Message from backend: {apiMessage}</p>
    </div>
  );
}

export default Home;
