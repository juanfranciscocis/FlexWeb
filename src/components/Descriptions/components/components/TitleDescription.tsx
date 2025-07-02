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
            <div className="flex flex-wrap items-center justify-start mb-4 gap-4 sm:gap-6">
                <div className="flex flex-row items-center mr-2 min-w-[100px] sm:min-w-[120px]">
                    <div className="mr-4">
                        <IoMdPersonAdd className="text-2xl text-gray-400" />
                    </div>
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <h1 className="text-black">{description.guestNumber}</h1>
                        <p>Guests</p>
                    </div>
                </div>
                <div className="flex flex-row items-center mr-2 min-w-[100px] sm:min-w-[120px]">
                    <div className="mr-4">
                        <FaBed className="text-2xl text-gray-400" />
                    </div>
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <h1 className="text-black">{description.bedrooms}</h1>
                        <p>Bedrooms</p>
                    </div>
                </div>
                <div className="flex flex-row items-center mr-2 min-w-[100px] sm:min-w-[120px]">
                    <div className="mr-4">
                        <FaBath className="text-2xl text-gray-400" />
                    </div>
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <h1 className="text-black">{description.bathrooms}</h1>
                        <p>Bathrooms</p>
                    </div>
                </div>
                <div className="flex flex-row items-center mr-2 min-w-[100px] sm:min-w-[120px]">
                    <div className="mr-4">
                        <FaHouse className="text-2xl text-gray-400" />
                    </div>
                    <div className="flex flex-col items-center justify-center text-gray-400">
                        <h1 className="text-black">{description.beds}</h1>
                        <p>Beds</p>
                    </div>
                </div>
            </div>
            <hr className="my-4 w-full border-gray-300"/>
        </div>
    );
}

export default TitleDescription;
