//react snippet
import React from 'react';
import ImageHero from "./components/ImageHero.tsx";
import {useDescriptions} from "./hooks/useDescriptions.ts";
import TitleDescription from "./components/TitleDescription.tsx";
import ListingOperativeInfo from "./components/ListingOperativeInfo.tsx";

const DescriptionsHero: React.FC<{ id: number }> = ({ id }) => {
    const {
        setID,
        images,
        listing,
        listingInfo,
        operativeInfo
    } = useDescriptions();

    // Set the ID when the component mounts
    React.useEffect(() => {
        setID(id);
    }, [id, setID]);


    return (
        <div className="pt-10 pb-10 lg:pl-32 lg:pr-32  md:pl-32 md:pr-32 sm:pl-10 sm:pr-10 xs:pl-10 xs:pr-10 ">
        <ImageHero
            images={images}
        />
            <TitleDescription title={listing} description={listingInfo}/>
            <ListingOperativeInfo operativeInfo={operativeInfo} />
        </div>
    )

}

export default DescriptionsHero;
