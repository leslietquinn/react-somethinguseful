import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "./Utils/AuthProvider";
import AxiosProvider from "./Utils/AxiosProvider";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/styles.css";

import Public from "./Components/Public";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Terms from "./Components/Terms";
import Privacy from "./Components/Privacy";
import Missing from "./Components/Missing";
import Account from "./Components/Account";
import Url from "./Components/Url";
import User from "./Components/User";
import Site from "./Components/Site";

function App() {
    return (
        <>
            <ToastContainer className="toasty" />
            <BrowserRouter>
                <AuthProvider>
                    <AxiosProvider>
                        <Routes>
                            <Route element={<Public />}>
                                <Route path="/" exact element={<Home />} />
                                <Route path="about" element={<About />} />
                                <Route path="terms" element={<Terms />} />
                                <Route path="contact" element={<Contact />} />
                                <Route path="account" element={<Account />} />
                                <Route path="privacy" element={<Privacy />} />
                                <Route path="user/:slug" element={<User />} />
                                <Route path="site/:slug" element={<Site />} />

                                <Route path="*" element={<Missing />} />
                             </Route>
                        </Routes>
                    </AxiosProvider>
                </AuthProvider>
            </BrowserRouter>
        </>
    );
};

export default App;
