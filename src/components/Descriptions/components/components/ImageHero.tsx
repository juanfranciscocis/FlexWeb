//react snippet
import React from 'react';

const ImageHero: React.FC<{ images: string[] }> = ({ images = [] }) => {

    return (

            <div className="grid grid-cols-3 grid-rows-2 gap-2">
                <div className="row-span-2">
                    <img src={images[0]} alt="Hero" className="w-full h-full  object-cover rounded-lg"/>
                </div>
                <div>
                    <img src={images[1]} alt="Hero" className="w-full max-h-64 object-cover rounded-lg"/>
                </div>
                <div className="col-start-2 row-start-2">
                    <img src={images[2]} alt="Hero" className="w-full max-h-64 object-cover rounded-lg"/>
                </div>
                <div className="col-start-3 row-start-1">
                    <img src={images[3]} alt="Hero" className="w-full max-h-64 object-cover rounded-lg"/>
                </div>
                <div className="col-start-3 row-start-2">
                    <img src={images[4]} alt="Hero" className="w-full max-h-64 object-cover rounded-lg"/>
                </div>
            </div>

    );
}

export default ImageHero;
