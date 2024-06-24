import React from 'react';

export default function Loading({className = ''} : {className?: string}) {
    return (
        <button type="button" className={`${className} flex flex-row bg-green-500 items-center justify-center`}>
            <div className="animate-spin h-6 w-6">
                <div className="relative top-0 left-0 h-3 w-3 bg-white rounded-full"></div>
            </div>
            <p className="text-white pl-6">Loading...</p>
        </button>
    );
}