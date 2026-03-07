import React from 'react'
import Loader from '../components/Loader'
const Insights = () => {
 let laoding = false

 
 if(laoding){
    return (<Loader/>);
 }

  return (
    <div className="w-full h-screen flex justify-center items-center text-2xl text-gray-600">insights will be available soon...</div>
  )
}

export default Insights