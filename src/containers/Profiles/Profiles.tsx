import React, { useState, useEffect } from "react";
import { profiles } from "../../data/profileData";
import { ClipLoader } from "react-spinners";

const Profiles: React.FC = () => {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {profiles.map((profile: any) => (
                        <div key={profile.id} className="bg-white rounded-lg shadow-md p-4">
                            <img
                                src={profile.image}
                                alt={`${profile.name}'s profile`}
                                className="w-32 h-32 rounded-full mx-auto object-cover"
                            />
                            <div className="text-center mt-4">
                                <h2 className="text-lg text-stone-500 font-semibold">{profile.name}</h2>
                                <p className="text-gray-500">@{profile.instaID}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default Profiles;
