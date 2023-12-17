import { nanoid } from "nanoid";
import React, { useState } from "react";
import Spiner from "./Spiner";

const App = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    passwordA: "",
    id: nanoid(),
  });
  const[message,setMessage]=useState("")
  const[dis,setDis]=useState(true)
  const[load,setLoad]=useState(false)
  const[visible,setVisible]=useState(false)
  

  const handleChange = (e) => {
    const value = e.target.value;

    setData({
      ...data,
      [e.target.name]: value
    });
    setDis(false)
  };



  function submitForm(e) {
    e.preventDefault();
    // Error zona
    if(data.name.length<=2)  return setMessage('Ad minumun 2 herifden cox olmalidir');
    if(data.password.length<=6)  return setMessage('Sifrenin uzunlugu minumun 7 karakter olmalidir');
    // if(data.password!==data.passwordA)  return setMessage('Tekrar Sifreni duzgun daxil edin');

    // ---------
    // --------Loading-----
    setLoad(true)
    // --------------------
    setData((state)=> ({...state,id:nanoid()}))
    try {
      fetch("https://my-post-registration.onrender.com/product", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
  

        .catch((error) => {
          console.error("Fetch Error:", error);
          // Handle the error here
        });
    } catch (error) {
      console.log("Try-catch Error:", error);
    }
    setMessage('')


    setTimeout(() => {
      setLoad(false)
      
      e.target.reset();


    }, 1500);

  }

  return (
    <div className="app">
      <form onSubmit={submitForm}>
        <div>
          <label htmlFor="focos1">name</label>
          <input
            type="text"
            placeholder="enter name"
            id="focos1"
            name="name"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="focos2">email</label>
          <input
            type="email"
            placeholder="enter email"
            id="focos2"
            name="email"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="focos3">number</label>
          <input
            type="number"
            placeholder="enter number"
            id="focos3"
            name="number"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="focos4">password</label>
          <input
            type={visible ? 'text': 'password'}
            placeholder="enter password"
            id="focos4"
            name="password"
            required
            onChange={handleChange}
          />
          <button type="button" onClick={()=>setVisible(!visible)} >
            {visible? 'close': 'open'}
          </button>
        </div>
        <div>
          <label htmlFor="focos5">password again</label>
          <input
            type={visible ? 'text': 'password'}
            placeholder="enter pasword again"
            id="focos5"
            name="passwordA"
            required
            onChange={handleChange}
          />

        </div>
        <button type="submit"  disabled={dis} className="bg-blue-800 text-[#fff] py-2 px-4 mt-2 rounded">
         {load ? <> <Spiner/> <span>loading</span> </>:  'Send' }
        </button>
        {message && <p><span>🚨</span> {message}</p> }
      </form>
    </div>
  );
};

export default App;
