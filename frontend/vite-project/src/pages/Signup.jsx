import React, { useEffect, useRef, useState } from "react";
import LoginImage from "../assets/image/bg-remove-image/computer-monitor.png";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
function Signup() {
  const nameInputRef = useRef(null);
  const [formData,setFormData]=useState({

    name:'',
    username:'',
    email:'',
    password:''


  })


  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

 
  const handleChange =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});

  }


 

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => ! prevState); // true or false

  };

  const FormSubmition = async (e)=>{
    e.preventDefault();

    try {

      const response =await fetch('https://e-commerce-gclo.onrender.com/api/v1/auth/register',{

        method:"POST",
        headers:{
          "content-Type":'application/json'
        },
        body:JSON.stringify(formData)

      })

      const data = await response.json()

      if(response.ok){
        console.log("User register successfully",data)
      }else{
        // console.error('Error :',data.message)
      }
      
      setFormData({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    if (nameInputRef.current) {
      nameInputRef.current.focus(); // Focus back on the name input field after form reset
  }

      
    } catch (error) {
      console.log('Rquest failed ', error)
    }
  }

  return (
    <div className=" flex-col  md:flex-row  flex justify-between pt-[89px] md:h-screen ">
      <div className="flex flex-col h-1/2 justify-center md:w-1/2 md:h-full items-center bg-sky-200   text-center  ">
        <h4 className="text-xl font-Orbitron font-semibold  ">Gadget Core</h4>
        <img
          className=" h-[800px] object-contain  "
          src={LoginImage}
          alt="imagepc.png"
        />
      </div>
      <div className=" flex items-center justify-center  md:w-1/2  h-1/2  md:h-full bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full  max-w-md  my-2 ">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Sign Up
          </h2>
          <p className="text-center text-gray-600 mt-2 text-sm font-poppins">
            Don’t have an accout yet ?
            <NavLink to='/Login' className="text-green-500 cursor-pointer"> Sign Up</NavLink>
          </p>

          <form className="mt-8 flex flex-col gap-4" onSubmit={FormSubmition}>
            {/* Username/Email Input */}
            <input
              type='text'// toggle input type
              className="border-b border-gray-300 p-3  w-full focus:outline-none font-poppins  focus:border-black"
              placeholder="Your name"
              name="name"
              value={formData.name}
              ref={nameInputRef}
              onChange={handleChange}
            />
               
            
            <input
              type='text' // toggle input type
              className="border-b border-gray-300 p-3  w-full focus:outline-none font-poppins focus:border-black"
              placeholder="username "
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
               
            {/* Username/Email Input */}
            <input
              type='email' // toggle input type
              className="border-b border-gray-300 p-3  w-full focus:outline-none  font-poppins focus:border-black"
              placeholder="Email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
               
            {/* Password Input */}
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                className="border-b border-gray-300 p-3  w-full focus:outline-none  focus:border-black font-poppins"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {/* Show/Hide Password Icon */}
              {isPasswordVisible ? (
                <FaRegEyeSlash
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 cursor-pointer"
                />
              ) : (
                <FaRegEye
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5   cursor-pointer"
                />
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-green-500  focus:border-black"
                  required
                />
                <label className="ml-1 text-sm text-gray-600 font-poppins">
                 I agree with Privacy Policy and Terms of Use
                </label>
              </div>

            </div>

            {/* Sign In Button */}
            <button type="submit" className="bg-black text-white py-3 rounded-md w-full font-poppins   hover:bg-gray-800 transition">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
