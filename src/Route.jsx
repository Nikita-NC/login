// import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
// import Form from "./Form"
import FrontPage from "./FrontPage"
import Login from "./Login"
import Register from "./user/Register"
// import AutoForm from "./pages/AutoForm"

const Home = () => {
  return (
    <>
        <Router>
            <Routes>
            {/* <Route path="/" element={<Form/>}/> */}
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/frontpage" element={<FrontPage/>}/>
            {/* <Route path="/newform" element={<AutoForm/>}/> */}
            </Routes>
        </Router>
    </>
  )
}

export default Home