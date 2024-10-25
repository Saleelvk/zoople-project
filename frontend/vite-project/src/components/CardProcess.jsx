import React from 'react'

function CardProcess({name}) {
  return (
    <div className='font-poppins pt-[120px] md:w-full '>
    <div className='flex flex-col items-center p-5 '>
    <p className=' text-4xl font-semibold font-poppins p-4'>{name}</p>
    <div className='flex flex-row  text-sm md:text-md gap-4 md:gap-10 w-40 md:w-full justify-center items-center'>
        <div className=' flex text-xl gap-4 border-b-4 p-5 items-center   '>
        <p className='px-6 py-4 text-white text-xs sm:text-sm md:text-xl bg-black rounded-full '>1</p>
        <p className='font-poppins text-xs sm:text-sm  md:text-xl'>Shopping cart</p>
        </div>
        
        <div className='flex text-xl  gap-4 border-b-4 p-5 items-center '>
        <p className='px-6 py-4 text-white text-xs sm:text-sm md:text-xl bg-black rounded-full'>2</p>
        <p className='font-poppins  text-xs sm:text-sm md:text-xl'>CheckOut details</p>
        </div>

        <div className=' flex text-xl  gap-4 border-b-4 p-5 items-center  '>
        <p className='px-6 py-4 text-white sm:text-sm text-xs md:text-xl bg-black rounded-full'>3</p>
        <p className='font-poppins  text-xs sm:text-sm md:text-xl'>Order complete</p>

        </div>

        
    </div>
  
    </div>
</div>
  )
}

export default CardProcess
