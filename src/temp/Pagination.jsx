import React from 'react'

function Pagination({nextFn , prevFn , pageNo}) {
  return (
    <div className='w-full flex bg-gray-400 h-[50px] justify-center items-center p-4'>
        <div  className='px-8' onClick={prevFn}><i class="fa-solid fa-arrow-left"></i></div>
        <div>{pageNo}</div>
        <div className='px-8' onClick={nextFn}><i class="fa-solid fa-arrow-right"></i></div>
    </div>
  )
}

export default Pagination