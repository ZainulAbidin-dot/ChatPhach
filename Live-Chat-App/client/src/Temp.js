// header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Origin: *');
// header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
// header('Access-Control-Allow-Headers: *');
// header('Access-Control-Max-Age: 1728000');
// header("Content-Length: 0");
// header("Content-Type: text/plain"); 
import axios from 'axios';
import React, { useState, useEffect } from 'react'

const Temp = () => {
  
  const [data, setdata] = useState([]);
  const [notvacant, setnotvacant] = useState([]);
  const handleSubmit =async(e) => {

    let result = await axios.get('http://localhost:3004/clients/vacant')
     .then(response => console.log(response.data))
     .then(json => json)
     setdata(result);

     let result2 = await axios.get('http://localhost:3004/clients/notvacant')
     .then(response => setnotvacant(response.data))
     .then(json => json)
    //  setnotvacant(result2);
   }

  const handleSubmit2 =async(e) => {
    await axios.post('http://localhost:3004/vendors', {
      "room1":108,
      "room2":109,
      "name":"shanu",
      "email":"shanu@gmail.com",
      "password":"shanu"
      })
     .then(response => console.log(response.data))
     .then(json => json)
    //  setdata(result);

   }


        // axios.get('http://localhost:3000/vendors')
        // .then(response => response.data)
        // .then(json => console.log(json))
      
    
  return (
    <div>
    <h1>Loading...</h1>

    {notvacant?notvacant.map(item=>(
        <h3>{item.name}</h3>
    )):
    <h1>Loading...</h1>}
    <button onClick={e =>handleSubmit(e)}>Submit</button>
    </div>
  )
}

export default Temp