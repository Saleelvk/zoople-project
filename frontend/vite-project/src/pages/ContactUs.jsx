import React from "react";
import EmailSend from "../components/emailSend";

function ContactUs() {
  
  const onsubmitHandler=(event)=>{
    event.preventDefault()
 }


  return (
    <div   className="px-4 mt-[61px]  sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"> 
      <div >
        <div className="h-[392px] w-full  bg-black flex items-center justify-center">
          <p className="text-white text-[60px]  font-poppins">Contact Page </p>
        </div>
      </div>

      {/* contact owner */}

      <div className="w-full flex justify-around  bg-gray-100  my-28 ">

        <div className="flex flex-col sm:flex-row sm:w-1/2 ">
          <img
            className=" hidden sm:block "
            src="/src/assets/image/elegant-smartphone-composition.jpg"
            alt=""
          />
        </div>

        <div className=" w-full sm:w-1/2  bg-white shadow-lg  p-8 border ">
          <h2 className="text-3xl font-bold mb-8 text-center font-poppins">Contact Us</h2>

          <form  onSubmit={onsubmitHandler} className="space-y-6">
            <div className="flex flex-col ">
              <label className="mb-2 text-sm font-semibold font-poppins " htmlFor="name">
                Name
              </label>
              <input
                className="border font-poppins border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="name"
                placeholder="Your Name"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold font-poppins" htmlFor="email">
                Email
              </label>
              <input
                className="border font-poppins border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                id="email"
                placeholder="Your Email"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-semibold font-poppins" htmlFor="message">
                Message
              </label>
              <textarea
                className="border border-gray-300 font-poppins rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="message"
                rows="5"
                placeholder="Your Message"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-lg font-poppins hover:bg-gray-700 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      <EmailSend />
    </div>
  );
}

export default ContactUs;
