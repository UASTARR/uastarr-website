import React from 'react'
import BaseScripts from '@/app/components/scripts/BaseScripts'
import ReCaptchaApi from '@/app/components/scripts/ReCaptchaApi'
import ContactPageCSS from '@/app/components/scripts/ContactPageCSS'
import { addResponse } from '@/library/google/api.js'

import { Metadata } from 'next';
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
    title: "Contact Us",
};

const ContactPage = () => {
    // TODO: Add recaptcha and remove redirect
    redirect('/down-for-maintenance')
    async function submitForm(formData: FormData) {
        'use server'

        const data = {
            firstName: formData.get('firstname'),
            lastName: formData.get('lastname'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            know: formData.get('know'),
            subscribe: formData.get('subscribe'),
            message: formData.get('message'),
        }
        
        const dataArray = Object.values(data)

        // TODO: Transition page
        if (await addResponse(dataArray)) {
            console.log("Message sent successfully!");
        } else {
            console.log("An error occurred. Please try again later.");
        }
        console.log(data)
    }
    return (
        <main>
            <ContactPageCSS />
            <BaseScripts />
            <ReCaptchaApi />
            <div className="fixed top-0 justify-center w-screen h-screen">
                <video autoPlay muted loop className="object-cover min-w-full min-h-full">
                    <source src="/assets/backgrounds/fireflies_background.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="relative z-30 pl-40">
                <div className="h-40"></div>
                <h1 className="text-4xl text-white" style={{ fontSize: "50px" }}>Contact Us</h1>
                <h2 style={{ marginBottom: "2px", marginTop: "10px" }}>Want to join us? Want to become a sponsor? Any other questions?</h2>
                <p style={{ marginTop: "2px" }}>Let us know! We'd love to hear what you think</p>
            </div>
            <div className="h-12"></div>


            <div className="relative z-30">
                <div className="h-3"></div>
                <div className="container">

                    <form action={submitForm}>
                        <div className="half-input-container">
                            <div className="half-input">
                                First Name
                                <input type="text" id="fname" name="firstname" placeholder="" required />
                            </div>
                            <div className="half-input">
                                Last Name
                                <input type="text" id="lname" name="lastname" placeholder="" required />
                            </div>
                        </div>
                        Email
                        <input type="email" id="email" name="email" placeholder="" required />

                        <div>
                            Subject
                            <select id="subject" name="subject" defaultValue={""} required>
                                <option value="" disabled hidden>Choose an option</option>
                                <option value="member_inquiry">Membership Application Inquiry</option>
                                <option value="sponsorship_inquiry">Sponsorship Inquiry</option>
                                <option value="donation_inquiry">Donation Inquiry</option>
                                <option value="event_inquiry">Event Enquiry</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            How do you know about us?
                            <input type="text" id="know" name="know" placeholder="" />
                        </div>
                        Leave a Message
                        <textarea id="message" name="message" placeholder="" style={{ height: "150px" }}></textarea>

                        <div className="center-align">
                            <input type="checkbox" id="subscribe" name="subscribe" value="newsletter" />
                            <label htmlFor="subscribe"> Subscribe to the STARR newsletter</label><br />

                            <div className="g-recaptcha grecaptcha" data-sitekey="6Leo32UpAAAAAJmvvWFtlNfapVA2bn_qxHIbO77J"></div>

                            <input style={{ marginTop: "10px" }} type="submit" value="Submit" />

                        </div>

                    </form>
                </div>
            </div>

            <div className="relative banner">
                Looking for us? We got you.
            </div>
            <div style={{ width: "100%" }} className="relative z-30">
                <iframe
                    width="100%"
                    height="400"
                    frameBorder="10" style={{ border: "3px" }}
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAcBwWVLuUFQMaRS-eFzHm8UxtKW6wJM9Q&q=Donadeo+Innovation+Centre+for+Engineering,+9211+116+St+NW,+Edmonton,+AB+T6G+1H9&maptype=satellite&zoom=15"
                    allowFullScreen>
                </iframe>
            </div>
        </main>
    )
}

export default ContactPage;