'use client';
import { useEffect } from "react";

const BaseScripts = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/scripts.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
        document.body.removeChild(script);
        };
    }, []);
    return (
        <div></div>
    );
}


export default BaseScripts;