'use client';
import { useEffect } from "react";

const ReCaptchaApi = () => {
    return (
        useEffect(() => {
            const script = document.createElement("script");
            script.src = "https://www.google.com/recaptcha/api.js";
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);
            return () => {
                document.head.removeChild(script);
            };
        }, []),
        <></>
    )
}

export default ReCaptchaApi;