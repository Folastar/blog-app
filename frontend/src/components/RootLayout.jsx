import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";
import { BsFeather } from "react-icons/bs";
// import Modal from "../pages/Modal";

const RootLayout = () => {
    return ( <>
        <Navigation/>

            <main className="min-h-dvh text-rose-500 relative">
                <Outlet/>
            </main>

            <Link to="/addblog" className="size-16 z-50 flex justify-center items-center border-2 border-rose-500 rounded-full text-rose-500 bottom-5 right-5 fixed transition hover:bg-rose-500 hover:text-white"> <BsFeather className="text-3xl" /></Link>
                {/* <Modal/> */}
        <Footer/>
    </> );
}
 
export default RootLayout

