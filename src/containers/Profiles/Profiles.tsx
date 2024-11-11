import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Profiles: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const ussid = localStorage.getItem("ussid"); // Retrieve 'ussid' from localStorage

                if (ussid) {
                    // Prepare the request options for fetch
                    const response = await fetch(`http://127.0.0.1:8000/instagram/find_matches/${ussid}`);
                    
                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        setProfiles(data.matches); // Assuming 'matches' array is in the response
                    } else {
                        console.error("Failed to fetch profiles:", response.statusText);
                    }
                }
            } catch (error) {
                console.error("Error fetching profiles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <ClipLoader size={50} color={"#123abc"} loading={loading} />
                </div>
            ) : (
                profiles.length === 0 ? (
                    <div className="flex justify-center items-center min-h-screen">
                        <p>No matches Found</p>
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
                )
            )}
        </>
    );
}

export default Profiles;
