import { userData } from "../../data/userData";
import { useState, useEffect } from "react";
import "./ProfilePicture.css"
const ProfilePicture = () => {
    const [imgSrc, setImgSrc] = useState("");
    const [imgAlt, setImgAlt] = useState("");

    useEffect(() => {
        const profilePhoto = document.querySelector(".img__container");
        const isDarkMode = profilePhoto.classList.contains("dark");

        userData.forEach((data) => {
            setImgSrc(isDarkMode ? data.userPicDark : data.userPic);
            setImgAlt(data.userName);
        });
    }, []);

    return (
        <div className="img__container">
            <img src={imgSrc} alt={imgAlt} className="profile__img" />
        </div>
    );
}

export default ProfilePicture;
