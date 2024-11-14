import React from "react";
import Image from "next/image";

export default function MerchItem({
    name,
    description,
    price,
    imgref,
}: {
    name: string;
    description: string;
    price: number;
    imgref: string | undefined;
}) {
    const placeholderImage = '/assets/placeholder_album.jpeg'

    return (
        <div className="max-w-4xl mx-auto p-8 shadow-lg flex items-start space-x-8 h-[508px]">
            {/* Image on the Left */}
            <div className="w-1/2 h-full flex justify-center">
                <Image
                    src={imgref ?? placeholderImage}
                    alt={name}
                    width={400}
                    height={400}
                    className="w-full h-full object-contain rounded-lg"
                />
            </div>

            <div className="flex-1 pl-8 flex flex-col">
                <h1 className="text-4xl font-bold text-white mb-4">{name}</h1>

                <p className="text-gray-300 text-lg leading-relaxed mb-10 flex-grow">{description}</p>

                <div className="mt-auto">
                    <p className="text-gray-300 mb-1 font-semibold">Price:</p>
                    <p className="text-3xl font-semibold text-lime-600">${price}</p>
                </div>
            </div>
        </div>
    );
}
