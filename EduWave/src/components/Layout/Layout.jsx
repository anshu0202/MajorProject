import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <>
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <title>{title}</title>

            </Helmet>
            <Header />
            <main style={{ minHeight: "80vh" }}>
                {children}
                <ToastContainer position="top-center" autoClose={5000} />
            </main>
            <Footer />

        </>
    )
}

Layout.defaultProps = {
    title: "Education Wave ",
    description: "Education Wave | Your Ultimate Educatin Platform!! ",
    keywords: "mern , Education , node , mongodb",
    author: "Laxmikant , Anshu , Seea , Anurag "


}

export default Layout