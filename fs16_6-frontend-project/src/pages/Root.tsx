import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"

import Footer from "../components/Footer"
import NavBar from "../components/NavBar"


function Root() {
    return (
        <>
            <NavBar />
            <Outlet />
            <Toaster richColors />
            <Footer />
        </>
    )
}

export default Root