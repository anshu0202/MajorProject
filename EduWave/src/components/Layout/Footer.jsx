import React from 'react'

function Footer() {
    return (
        <>
            <div className="footer">
                <div className="footer-main">
                    <div className="footer-intro">
                        <h1>Stay connected with Us. </h1>
                    </div>

                    <div className="footer-social">

                        <div className="linkedin">
                            <img src="https://i.postimg.cc/0ynccSBG/linkedin.gif" alt="" srcset="" />

                            <a href="https://www.linkedin.com/in/seea-rani-3642bb215/" target="_blank">
                                <h1><span><i class="fa-solid fa-arrow-up-right-from-square"></i></span>Linkedin</h1>
                            </a>

                        </div>

                        <div className="instagram">
                            <img src="https://i.postimg.cc/sDqV1Bcc/instagram.gif" alt="" srcset="" />
                            <a href="https://www.instagram.com/seea__garg/" target="_blank">
                                <h1><span><i class="fa-solid fa-arrow-up-right-from-square"></i></span>Instagram</h1>
                            </a>

                        </div>

                        {/* <div className="github">
                            <img src="https://i.postimg.cc/yxWH8B3t/github.gif" alt="" srcset="" />
                            <a href="https://github.com/Abdev1205" target="_blank">
                                <h1><span><i class="fa-solid fa-arrow-up-right-from-square"></i></span>Github</h1>
                            </a>

                        </div> */}

                        {/* <div className="youtube">
                            <img src="https://i.postimg.cc/NjqWWRDW/youtube.gif" alt="" srcset="" />
                            <a href="https://www.youtube.com/c/Abideas" target="_blank">
                                <h1><span><i class="fa-solid fa-arrow-up-right-from-square"></i></span>Youtube</h1>
                            </a>

                        </div> */}

                        <div className="facebook">
                            <img src="https://i.postimg.cc/FRMMNcmd/facebook.gif" alt="" srcset="" />
                            <a href="https://www.facebook.com/people/Seea-Garg/pfbid02Nmj7YjZhsRQRXKCx8T4Dip4W3QvHJf2xzFAnNuBmqyVVDh2iGVTEBYSM4R2F5z6rl/" target="_blank">
                                <h1><span><i class="fa-solid fa-arrow-up-right-from-square"></i></span>Facebook</h1>
                            </a>

                        </div>

                    </div>


                </div>
            {/* <div className="footer-content">
                <h1>Developed and Designed By <a href="https://dev-ab.netlify.app/" target="_blank">Abhay Mishra</a>
                </h1>
            </div> */}
            
            <footer class="py-3 " style={{background: "linear-gradient(303deg, rgba(182, 51, 118, 1) 5%, rgba(29, 15, 74, 1) 57%)",
  width: "100%"}}>
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted text-white">Home</a></li>
      {/* <li class="nav-item"><a href="#" class="nav-link px-2 text-muted text-white">Features</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted text-white">Pricing</a></li> */}
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted text-white">Contact Us</a></li>
      <li class="nav-item"><a href="#" class="nav-link px-2 text-muted text-white">About Us</a></li>
    </ul>
    <p class="text-center text-light">© 2023 Education Hub, Inc</p>
  </footer>



            </div>
        </>
    )
}

export default Footer