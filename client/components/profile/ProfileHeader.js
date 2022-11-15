import { useRouter } from 'next/router';
import React from 'react'
import { BsArrowLeftShort } from "react-icons/bs";

const style = {
    wrapper: `border-[#38444d] border-b`,
    header: `py-1 px-3 mt-2 flex items-center`,
    primary: `bg-transparent outline-none font-bold`,
    secondary: `text-[#8899a6] text-xs`,
    backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-[#313b44] p-1`,
    coverPhotoContainer: `flex items-center justify-center h-[15hv] overflow-hidden`,
    coverPhoto: `object-cover h-full w-full`,
    profileImageContainer: `w-full h-[7rem] rounded-full mt-[-4rem] mb-2 flex justify-start items-center px-3 flex justify-between`,
    profileImage: `object-cover rounded-full h-full`,
    profileImageNft: `object-cover h-full`,
    profileImageMint: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
    details: `px-3`,
    nav: `flex justify-around mt-4 mb-2 text-xs font-semibold text-[#8899a6]`,
    activeNav: `text-white`
}

const ProfileHeader = () => {

    const router = useRouter()

    const isProfileImageNft = true;


  return (
    <div className={ style.wrapper }>
        <div className={ style.header }>
            <div 
                className={ style.backButton }
                onClick={ () => {
                    router.push("/")
                }}
            > 
                <BsArrowLeftShort />
            </div>
            <div className={ style.details }>
                <div className={ style.primary }>
                    Artie
                </div>
                <div className={ style.secondary }>
                    10 nuts
                </div>
            </div>
        </div>
        <div className={ style.coverPhotoContainer }>
            <img 
                src="https://wonderfulengineering.com/wp-content/uploads/2014/05/twitter-header-3.jpg"
                alt="Tree in the savannah during sunset"
                className={ style.coverPhoto }
            />
        </div>
        <div className={ style.profileImageContainer }>
            <div className={
                isProfileImageNft ? "hex" : style.profileImageContainer
            }>
                <img 
                    src="https://media.tenor.com/jMdv7eVShFoAAAAC/squirrel-pixel.gif"
                    alt="Dancing Squirrel GIF"
                    className={ 
                        isProfileImageNft ? style.profileImageNft : style.profileImage
                        }
                />
            </div>
        </div>
    </div>
  )
}

export default ProfileHeader