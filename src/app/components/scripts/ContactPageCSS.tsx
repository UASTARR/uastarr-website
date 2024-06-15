'use client';
import { useEffect } from "react";

const ContactPageCSS = () => {
    return (
        useEffect(() => {
            const link = document.createElement("link");
            link.href = "/styles/contact.css";
            link.rel = "stylesheet";
            document.head.appendChild(link);
            return () => {
                document.head.removeChild(link);
            };
        }, []),
        <></>
    )
}

export default ContactPageCSS;