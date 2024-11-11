import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { UserIcon } from "@heroicons/react/solid";
import { FaInstagram, FaFlag } from "react-icons/fa"; // Import Instagram and Flag icons

const Profiles: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [profiles, setProfiles] = useState([]);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const ussid = localStorage.getItem("ussid");

                if (ussid) {
                    const response = await fetch(
                        `http://127.0.0.1:8000/instagram/find_matches/${ussid}`
                    );

                    if (response.ok) {
                        const data = await response.json();
                        console.log(data);
                        setProfiles(data.matches);
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
            ) : profiles.length === 0 ? (
                <div className="flex justify-center items-center min-h-screen">
                    <p className="text-gray-600 dark:text-gray-300">No matches found</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    {profiles.map((profile: any) => (
                        <div
                            key={profile.id}
                            className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 text-center"
                        >
                            <img
                                src={profile.picture}
                                alt={`${profile.name}'s profile`}
                                className="w-32 h-32 rounded-full mx-auto object-cover"
                            />
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold dark:text-white flex items-center justify-center space-x-2">
                                    <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                    <span>{profile.name}</span>
                                </h2>
                                <div className="flex items-center justify-center space-x-2 mt-2 text-gray-600 dark:text-gray-400">
                                    <FaInstagram className="w-5 h-5 text-pink-600" />
                                    <span>@{profile.instaid}</span>
                                </div>
                                <div className="flex items-center justify-center space-x-2 mt-2 text-gray-600 dark:text-gray-400">
                                    <FaFlag className="w-5 h-5 text-green-600" /> {/* Flag Icon */}
                                    <span>{profile.nationality}</span>
                                </div>
                                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                                    {profile.bio}
                                </p>
                                <div className="flex items-center justify-center space-x-2 mt-4">
                                    <span className="text-gray-600 dark:text-gray-300">Age: {profile.age}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default Profiles;
