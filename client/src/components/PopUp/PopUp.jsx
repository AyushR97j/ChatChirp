import React from 'react'

const PopUp = ({text, setPopupText}) => {

  const handleRemovePopup = ( () => {
    //console.log("hi")
    setPopupText("")
  })

  return (
    <div className=' absolute h-1/4 w-1/3 flex flex-col items-center justify-center gap-4 rounded-xl -mt-16 backdrop-blur-md font-semibold border border-b-slate-700'>
      {text.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}
      <button className={`text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`} onClick={handleRemovePopup}>
        close
      </button>
    </div>
  )
}

export default PopUp
