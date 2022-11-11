import React from 'react'
import { format } from "timeago.js";
import { BsFillPatchCheckFill } from 'react-icons/bs'

const style = {
    wrapper: `flex p-3 border-b border-[#38444d]`,
    profileImage: `rounded-full h-[40px] w-[40px] object-cover`,
    postMain: `flex-1 px-4`,
    headerDetails: `flex items-center`,
    name: `font-bold mr-1`,
    verified: `text-[0.8rem]`,
    addressAndTime: `text-[#8899a6] ml-1`,
    nut: `my-2`,
    image: `rounded-3xl`,
    footer: `flex justify-between mr-28 mt-4 text-[#8899a6]`,
    footerIcon: `rounded-full text-lg p-2`
}

const Post = ({
    displayName,
    userName,
    text,
    avatar,
    timestamp,
    isProfileImageMint,
}) => {
    return(
        <div className={style.wrapper}>
            <div>
                <img 
                    src={avatar}
                    alt={userName}
                    className={
                        isProfileImageMint
                            ? `${style.profileImage} smallHex`
                            : style.profileImage
                    }
                />
                </div>
                <div className={style.postMain}>
                    <div>
                        <span className={style.headerDetails}>
                            <span className={style.name}>
                                {displayName}
                            </span>
                            {isProfileImageMint && (
                                <span className={style.verified}>
                                    <BsFillPatchCheckFill />
                                </span>
                                )}
                            <span className={style.addressAndTime}>
                                @{ userName } • { format(new Date(timestamp).getTime()) }
                            </span>
                        </span>
                        <div className={style.text}>
                            { text }
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Post