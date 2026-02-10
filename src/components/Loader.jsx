import React from 'react'

const Loader = ({title, titleClass}) => {
  return (
    <div className="w-full h-full">
    <div className="w-12 absolute top-1/2 left-1/2 -translate-1/2">
     <h1 className={`text-center text-xl font-bold  w-full ${titleClass}`}>{title}</h1>
   <div className="w-12   text-lime-500">
    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="12" r="0">
      <animate begin="0;spinner_z0Or.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" fill="freeze"></animate>
      <animate begin="spinner_OLMs.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" fill="freeze"></animate>
      <animate begin="spinner_UHR2.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" fill="freeze"></animate>
      <animate id="spinner_lo66" begin="spinner_Aguh.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" fill="freeze"></animate>
      <animate id="spinner_z0Or" begin="spinner_lo66.end" attributeName="cx" dur="0.001s" values="20;4" fill="freeze"></animate>
      </circle>
      <circle cx="4" cy="12" r="3">
        <animate begin="0;spinner_z0Or.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" fill="freeze"></animate>
        <animate begin="spinner_OLMs.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" fill="freeze"></animate>
        <animate id="spinner_JsnR" begin="spinner_UHR2.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" fill="freeze"></animate>
        <animate id="spinner_Aguh" begin="spinner_JsnR.end" attributeName="cx" dur="0.001s" values="20;4" fill="freeze"></animate>
        <animate begin="spinner_Aguh.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" fill="freeze"></animate></circle><circle cx="12" cy="12" r="3"><animate begin="0;spinner_z0Or.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" fill="freeze"></animate><animate id="spinner_hSjk" begin="spinner_OLMs.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" fill="freeze"></animate><animate id="spinner_UHR2" begin="spinner_hSjk.end" attributeName="cx" dur="0.001s" values="20;4" fill="freeze"></animate><animate begin="spinner_UHR2.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" fill="freeze"></animate><animate begin="spinner_Aguh.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" fill="freeze"></animate></circle><circle cx="20" cy="12" r="3"><animate id="spinner_4v5M" begin="0;spinner_z0Or.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="3;0" fill="freeze"></animate><animate id="spinner_OLMs" begin="spinner_4v5M.end" attributeName="cx" dur="0.001s" values="20;4" fill="freeze"></animate><animate begin="spinner_OLMs.end" attributeName="r" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="0;3" fill="freeze"></animate><animate begin="spinner_UHR2.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="4;12" fill="freeze"></animate><animate begin="spinner_Aguh.end" attributeName="cx" calcMode="spline" dur="0.5s" keySplines=".36,.6,.31,1" values="12;20" fill="freeze"></animate></circle></svg></div>
   </div>
   </div>
  )
}

export default Loader