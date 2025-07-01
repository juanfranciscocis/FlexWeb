//react snippet
import React from 'react';
import type {ListingInfo} from "../hooks/useDescriptions.ts";
import {FaBath, FaBed} from "react-icons/fa";
import {IoMdPersonAdd} from "react-icons/io";
import {FaHouse} from "react-icons/fa6";

const TitleDescription = ({title, description}: { title: string; description: ListingInfo }) => {

    return (
        <div>
            <div className="flex flex-col items-start justify-start mt-6 ">
                <h1 className="text-4xl font-bold mb-4 text-gray-800">{title}</h1>
            </div>
            <div className={`flex flex-row items-center justify-start  mb-4 gap-2`}>
                <div className="flex flex-row items-center mr-2">
                    <div className="mr-4">
                        <IoMdPersonAdd
                            className="text-2xl text-gray-400"/>
                    </div>
                    <div className="flex flex-col items-center justify-cente text-gray-400">
                        <h1 className={`text-black`}>{description.guestNumber}</h1>
                        <p className={``}>Guests</p>
                    </div>
                </div>
                <div className="flex flex-row items-center mr-2">
                    <div className="mr-4">
                        <FaBed className="text-2xl text-gray-400"/>
                    </div>
                    <div className="flex flex-col items-center justify-cente text-gray-400">
                        <h1 className={`text-black`}>{description.bedrooms}</h1>
                        <p className={``}>Bedrooms</p>
                    </div>
                </div>
                <div className="flex flex-row items-center mr-2">
                    <div className="mr-4">
                        <FaBath
                            className="text-2xl text-gray-400"/>
                    </div>
                    <div className="flex flex-col items-center justify-cente text-gray-400">
                        <h1 className={`text-black`}>{description.bathrooms}</h1>
                        <p className={``}>Bathrooms</p>
                    </div>
                </div>
                <div className="flex flex-row items-center mr-2">
                    <div className="mr-4">
                        <FaHouse
                            className="text-2xl text-gray-400"/>
                    </div>
                    <div className="flex flex-col items-center justify-cente text-gray-400">
                        <h1 className={`text-black`}>{description.beds}</h1>
                        <p className={``}>Beds</p>
                    </div>
                </div>
            </div>
            <hr className="my-4 w-full border-gray-300"/>
        </div>
    );
}

export default TitleDescription;
