import React from 'react';
import type {OperativeInfo} from "../hooks/useDescriptions.ts";
import {Card} from "@mui/material";
import {FaCalendarDay, FaClock, FaWifi} from 'react-icons/fa';
import {MdBlock, MdOutlineAcUnit, MdPets, MdSmokeFree} from "react-icons/md";
import {GiCookingPot} from "react-icons/gi";
import {BiSolidWasher} from "react-icons/bi";
import {FaShield} from "react-icons/fa6";
import BookingWidget from "./BookingWidget.tsx";
import ListingReviews from "./ShowReviewsForListing.tsx";

const ListingOperativeInfo = ({operativeInfo}: { operativeInfo: OperativeInfo }) => {


    //create a list of icons for amenities
    const amenityIcons = [
        {name: "Wi-Fi", icon: <FaWifi className={`text-2xl`}/>},
        {name: "Air conditioning", icon: <MdOutlineAcUnit className={`text-2xl`}/>},
        {name: "Kitchen", icon: <GiCookingPot className={`text-2xl`}/>},
        {name: "Washer", icon: <BiSolidWasher className={`text-2xl`}/>},
    ];

    const houseRulesIcons = [
        {name: "No smoking", icon: <MdSmokeFree/>},
        {name: "No pets", icon: <MdPets/>},
        {name: "No parties or events", icon: <MdBlock/>},
    ];


    if (!operativeInfo || Object.keys(operativeInfo).length === 0) {
        return <div className="text-gray-500">No operative information available.</div>;
    }

    return (
        <div className="flex flex-row gap-4 min-w-full ">
            <div className={`flex flex-col items-center justify-center min-w-3/4 gap-4 `}>
                <Card className={` w-full rounded-2xl shadow-xl p-6 border border-gray-200`}>
                    <div className="p-4">
                        <h1 className="text-2xl font-semibold mb-2">About</h1>
                        <p className="text-gray-700">
                            {operativeInfo.about || "No description available."}
                        </p>
                    </div>
                </Card>

                <Card className={'w-full rounded-2xl shadow-xl p-6 border border-gray-200'}>
                    <div className="p-4">
                        <h1 className="text-2xl font-semibold mb-2">Amenities</h1>
                        <div className="grid grid-cols-3 gap-2">
                            {operativeInfo.amenities.map((amenity, index) => (
                                <div key={index} className="flex items-center  mb-2">
                                    <div className="mr-2 text-gray-500">
                                        {amenityIcons.find(icon => icon.name === amenity)?.icon || "•"}
                                    </div>
                                    <span className="text-gray-700">{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                <Card className={'w-full  rounded-2xl shadow-xl p-6 border border-gray-200'}>
                    <div className="p-4 mb-2">
                        <h1 className="text-2xl font-semibold mb-2">Stay Policies</h1>
                        <div className="flex flex-col gap-6">


                            <Card style={{backgroundColor: '#F1F3EE',}} className={`rounded-2xl shadow-xl p-6 border border-gray-200`}>
                                <div className="p-4">
                                    <div className={`flex flex-row items-start justify-start gap-2`}>
                                        <FaClock className="text-2xl text-gray-500"/>
                                        <h1 className={`text-gray-700 text-xl`}>Check-in & Check-out</h1>
                                    </div>
                                </div>
                                <div className="flex flex-row  min-w-full pr-6 pl-6 pb-6">
                                    <Card className=" mr-2 w-1/2  rounded-2xl shadow-xl p-6 border border-gray-200">
                                        <div className="p-4">
                                            <div className="flex flex-col items-start justify-start gap-2">
                                                <h1>Check-in time</h1>
                                                <h1 className="text-gray-900 text-xl font-bold">{operativeInfo.policies.checkIn}</h1>
                                            </div>
                                        </div>
                                    </Card>
                                    <Card className=" w-1/2  rounded-2xl shadow-xl p-6 border border-gray-200">
                                        <div className="p-4">
                                            <div className="flex flex-col items-start justify-start gap-2">
                                                <h1>Check-out time</h1>
                                                <h1 className="text-gray-900 text-xl font-bold">{operativeInfo.policies.checkOut}</h1>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Card>

                            <Card style={{backgroundColor: '#F1F3EE',}} className={`bg- rounded-2xl shadow-xl p-6 border border-gray-200`}>
                                <div className="p-4">
                                    <div className={`flex flex-row items-start justify-start gap-2`}>
                                        <FaShield className="text-2xl text-gray-500"/>
                                        <h1 className={`text-gray-700 text-xl`}>House Rules</h1>
                                    </div>
                                </div>
                                <div className="flex flex-wrap min-w-full pr-6 pl-6 pb-6 gap-4">
                                    {operativeInfo.policies.houseRules.map((rule, index) => (
                                        <Card key={index} className="rounded-full w-[calc(50%-0.5rem)]  shadow-xl p-6 border border-gray-200">
                                            <div className="p-4">
                                                <div className="flex flex-row items-start justify-start gap-2">
                                                    <div className="text-gray-500">
                                                        {houseRulesIcons.find(icon => icon.name === rule)?.icon || "•"}
                                                    </div>
                                                    <h1 className="text-gray-900 text-xl font-bold">{rule}</h1>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </Card>


                            <Card style={{backgroundColor: '#F1F3EE',}}  className={` rounded-2xl shadow-xl p-6 border border-gray-200`}>
                                <div className="p-4">
                                    <div className={`flex flex-row items-start justify-start gap-2`}>
                                        <FaCalendarDay className="text-2xl text-gray-500"/>
                                        <h1 className={`text-gray-700 text-xl`}>Cancellation Policies</h1>
                                    </div>
                                </div>
                                <div className="flex flex-col  min-w-full pr-6 pl-6 pb-6 gap-4">
                                    {operativeInfo.policies.cancellationPolicy.map((policy, index) => (
                                        <Card className=" mr-2 w-full bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                                            <div className="p-4">
                                                <div className="flex flex-col items-start justify-start gap-2">
                                                    <h1 className="text-gray-900 text-xl font-bold">{policy.title}</h1>
                                                    <h1>• {policy.description}</h1>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </div>
                </Card>

                <ListingReviews listingId={operativeInfo.id}/>

            </div>
            <div className={`flex flex-col items-center justify-start  min-w-1/4 `}>
                <BookingWidget/>
            </div>
        </div>
    );
}

export default ListingOperativeInfo;
