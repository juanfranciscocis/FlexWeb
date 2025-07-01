import React from 'react';

const HeaderComponent: React.FC = () => {


    return (
            <nav className="  sticky top-0 z-40 bg-flex">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <a
                                href={`/`}
                            >
                            <img
                                src={`https://lsmvmmgkpbyqhthzdexc.supabase.co/storage/v1/object/public/website/Uploads/Green_V3%20Symbol%20&%20Wordmark%20(1).png`}
                                className={`w-38`}
                            />
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href={`/ReviewsAdmin`}>
                            <button
                                className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors"
                            >
                                Admin Dashboard
                            </button>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
    )
}

export default HeaderComponent;
