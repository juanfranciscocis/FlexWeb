//react snippet
import React from 'react';
import ImageHero from "./components/ImageHero.tsx";
import {useDescriptions} from "./hooks/useDescriptions.ts";

const DescriptionsHero: React.FC<{ id: number }> = ({ id }) => {
    const {
        setID,
        images
    } = useDescriptions();

    // Set the ID when the component mounts
    React.useEffect(() => {
        setID(id);
    }, [id, setID]);


    return (
        <ImageHero
            images={images}
        />
    )

}

export default DescriptionsHero;
