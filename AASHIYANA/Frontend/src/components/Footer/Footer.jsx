import React from 'react';
import './Footer.css';

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';


export default function Footer() {
    return (
        <footer>
            <div>
                <hr />
                <section className='main'>
                    <div>
                        <h3>Support</h3>
                        <ul>
                            <li><a href="#" className="">Help Centre</a></li>
                            <li><a href="#" className="">Aashiyana Cover</a></li>
                            <li><a href="#" className="">Disability Support</a></li>
                            <li><a href="#" className="">Cancellation Options</a></li>
                            <li><a href="#" className="">Report Neighbourhood Concern</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3>Hosting</h3>
                        <ul>
                            <li><a href="#" className="">Aashiyana Your Home</a></li>
                            <li><a href="#" className="">Aashiyana Cover For Hosts</a></li>
                            <li><a href="#" className="">Hosting Resources</a></li>
                            <li><a href="#" className="">Community Forum</a></li>
                            <li><a href="#" className="">Hosting Responsibly</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3>Aashiyana</h3>
                        <ul>
                            <li><a href="#" className="">Newsroom</a></li>
                            <li><a href="#" className="">New Features</a></li>
                            <li><a href="#" className="">Careers</a></li>
                            <li><a href="#" className="">Investors</a></li>
                            <li><a href="#" className="">Aashiyana.org Emergency Stays</a></li>
                        </ul>
                    </div>
                </section>
                <hr />

                <section className='sticky footer-section'>
                    <div className="footer-container">
                        <div className="right-content">
                            <div>
                                <div>
                                    <ol>
                                        <div>© 2023 Aashiyana, Inc.</div>

                                        <li><a href="/privacy">Privacy</a></li>
                                        <li><a href="/terms">Terms</a></li>
                                        <li><a href="/sitemaps">Sitemap</a></li>
                                        <li><a href="/details">Company Details</a></li>
                                    </ol>
                                </div>

                                <div className="social-icons">
                                    <a href="https://www.facebook.com"><FaFacebook /></a>
                                    <a href="https://www.twitter.com"><FaTwitter /></a>
                                    <a href="https://www.instagram.com"><FaInstagram /></a>
                                    <a href="https://www.linkedin.com"><FaLinkedin /></a>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </footer>
    );
}
