import React from 'react'

function EmailSend() {


  const onsubmitHandler=(event)=>{
    event.preventDefault()
 }

  return (
    <div>
      <div className="flex justify-center items-center ">
        <div className="my-12 flex items-center flex-col leading-9 border-b ">
          <p className="hidden sm:block text-3xl font-poppins font-bold py-1">
            Stay Ahead in Tech! Join Our Newsletter
          </p>

          <p className=" hidden sm:block text-xl font-medium font-poppins py-4">
            Sign up for deals, new products, and promotions
          </p>
          <div className="flex items-center w-full  border-gray-300 rounded-lg p-2">
            <img
              className="w-6 h-6 mr-2"
              src="/src/assets/image/email.png"
              alt="Email Icon"
            />
            <input
           
              type="email"
              className="flex-1 outline-none pl-2 font-poppins placeholder-gray-500 py-1"
              placeholder="Enter address.."
            />
            <button   onSubmit={onsubmitHandler} className="ml-2 px-4 py-1  text-lg  font-poppins  text-black rounded">
              Send
            </button>
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default EmailSend
