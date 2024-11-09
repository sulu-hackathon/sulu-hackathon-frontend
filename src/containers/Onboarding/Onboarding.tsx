import React, {useState} from "react";
import { useDropzone } from "react-dropzone";

const Onboarding: React.FC = () => {

    const [onboardingData, setOnboardingData] = useState({
        instaID:"",
        name:"",
        about:"",
        dob:"",
        nationality:"",
        gender:"",
        image:""
    });

    const onboardingSubmitHandler = (e:any) => {
        e.preventDefault();
        console.log(onboardingData);
        setOnboardingData({
            instaID:"",
            name:"",
            about:"",
            dob:"",
            nationality:"",
            gender:"",
            image:""
        })
    }

    const onDrop = (acceptedFiles: any) => {
        const file = acceptedFiles[0];
        setOnboardingData({ ...onboardingData, image: file });
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
        maxFiles: 1,
    });

    return(
        <>
            <form onSubmit={onboardingSubmitHandler} className="flex flex-col gap-x-8 w-2/4">
                <input 
                    placeholder="instagram ID" 
                    onChange={e => setOnboardingData({...onboardingData, instaID:e.target.value})}
                    value={onboardingData.instaID}
                />
                <input 
                    placeholder="Name" 
                    onChange={e => setOnboardingData({...onboardingData, name:e.target.value})}
                    value={onboardingData.name}
                />
                <textarea
                    placeholder="About Me"
                    onChange={e => setOnboardingData({...onboardingData, about:e.target.value})}
                    value={onboardingData.about}
                />
                <input 
                    placeholder="Date of Birth" 
                    onChange={e => setOnboardingData({...onboardingData, dob:e.target.value})}
                    value={onboardingData.dob}
                />
                <input 
                    placeholder="Nationality" 
                    onChange={e => setOnboardingData({...onboardingData, nationality:e.target.value})}
                    value={onboardingData.nationality}
                />
                <select
                    onChange={e => setOnboardingData({...onboardingData, gender:e.target.value})}
                    value={onboardingData.gender}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                </select>
                <div {...getRootProps()} className="border border-dashed p-4 mt-2">
                    <input {...getInputProps()} />
                    {onboardingData.image ? (
                        <p>Uploaded File: {onboardingData.image.name}</p>
                    ) : (
                        <p>Drag & drop an image here, or click to select one</p>
                    )}
                </div>
                <button type="submit" className="mt-4">
                    Finish
                </button>
            </form>        
        </>
    );


}

export default Onboarding;