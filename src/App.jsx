import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./DashBoard";
import Settings from "./Settings";
import UserDetails from "./components/Get_Pages/UserDetails";
import AddUser from "./components/Post_Pages/AddUser";
import UpdateUser from "./components/Put_Pages/UpdateUser";
import Complete_Details from "./components/Get_Pages/Complete_Details";
import AddUserAddress from "./components/Post_Pages/AddUserAddress";
import AddBank from "./components/Post_Pages/AddBank";
import AddCompany from "./components/Post_Pages/AddCompany";
import UpdateBank from "./components/Put_Pages/UpdateBank";
import UpdateUserAddress from "./components/Put_Pages/UpdateUserAddress";
import UpdateUserCompany from "./components/Put_Pages/UpdateUserCompany";


function App() {

  return (
    <>
    <Router>
      <Routes> 
        <Route path="/" element={<Layout />}> 
            <Route index element={<Dashboard />} /> 
            <Route path="settings" element={<Settings />} />
            
            {/* Get Routers */}
            <Route path='users' element={<UserDetails />} />
            <Route path="user_details" element={<Complete_Details />} />

            {/* Post Routers */}
            <Route path='add_user' element={<AddUser />} />
            <Route path='add_user_address/' element={<AddUserAddress />} />
            <Route path='add_bank/' element={<AddBank />} />
            <Route path='add_company/' element={<AddCompany />} />
            {/* <Route path='add_company_address/' element={<AddCompanyAddress />} /> */}

            {/* Put Routers */}
            <Route path='update_user/' element={<UpdateUser />} />
            <Route path='update_user_bank/' element={<UpdateBank />} />
            <Route path='update_user_address/' element={<UpdateUserAddress />} />
            <Route path='update_user_company/' element={<UpdateUserCompany />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
