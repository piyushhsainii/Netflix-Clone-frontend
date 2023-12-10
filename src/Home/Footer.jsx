import React, { Fragment } from 'react'
import './footer.css'

const Footer = () => {
  return (
    <Fragment>
        <div className='footer-container' >
            <div>
                <div
                className='social-links'>
                    <a href="https://twitter.com/piyushsainii"><img 
                    className='footer-link-image'
                    src="./twitter.png" alt="" /> </a>
                    <a href="https://github.com/piyushhsainii"><img 
                    className='footer-link-image'
                    src="./github.png" alt="" /> </a>
                    <a href="https://www.linkedin.com/in/piyush-saini-b860ab1bb/"><img  
                    className='footer-link-image'
                    src="./linkedin-logo.png" alt="" /></a>
                  
                </div>
                <div
                className='footer-element'
                >
                        <div className="">
                            <ul>
                                <li>Audio Description</li>
                                <li>Investor Relations</li>
                                <li>Legal Notices</li>
                            </ul>
                        </div>
                        <div className="">
                            <ul>
                                <li>Help Centre</li>
                                <li>Jobs</li>
                                <li>Cookie References</li>
                            </ul>
                        </div>
                        <div className="">
                            <ul>
                                <li>Gift Cards</li>
                                <li>Terms of Use</li>
                                <li>Corporate Information</li>
                            </ul>
                        </div>
                        <div className="">
                            <ul>
                                <li>Media Centre</li>
                                <li>Privacy</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                </div>
                <div className='netflix-inc' >
                    @ 1997-2023 Netflix Inc.
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Footer