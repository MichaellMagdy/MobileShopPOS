
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (

    <div className="Container fluid  p-5 text-center bg-light " style={{ backgroundColor: '#0dcaf0' }}>
      {/* <Router> */}
      < div className="row mt-4 mb-4">
        <div className="">
          <h1 className="" >Covid-19 Management system</h1>
        </div>
        <Navbar />

      </div >
    </div >
  );
};

export default App;
