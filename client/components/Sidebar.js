import { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { GiSquirrel, GiTreehouse } from "react-icons/gi"
import { BsHouse } from "react-icons/bs"
import { RiUser3Fill, RiUser3Line } from "react-icons/ri";
import SidebarOptions from "./SiderbarOptions";

const style = {
    wrapper: `flex-[0.7] px-8 flex flex-col`,
    jerbyIconContainer: `text-3xl m-4`,
    postButton: `bg-[#A2E4B8] hover:bg-[#5FE88D] text-[#966E5C] flex items-center justify-center font-bold rounded-3xl h-[50px] mt-[20px] cursor-pointer`,
    navContainer: `flex-1`,
    profileButton: `flex items-center mb-6 cursor-pointer hover`,
    profileLeft: `flex item-center justify-center mr-4`,
    profileImage: `height-12 w-12 rounded-full`,
    profileRight: `flex-1 flex`,
    details: `flex-1`,
    name: `text-lg`,
    address: `text-[#5FE88D]`,
    moreContainer: `flex items-center mr-2`
}

function Sidebar({ initialSelectedIcon = "Nest" }) {

    const [selected, setSelected] = useState(initialSelectedIcon)

    return (
        <div className={style.wrapper}>
            <div className={style.jerbyIconContainer}>
                <GiSquirrel />
            </div>
            <div className={style.navContainer}>
                <SidebarOptions 
                    Icon={ selected == "Nest" ? GiTreehouse : BsHouse }
                    text="Nest"
                    isActive={Boolean(selected == "Home")}
                    setSelected={ setSelected }
                    redirect={"/"}
                />
                <SidebarOptions 
                    Icon={selected == "Profile" ? RiUser3Fill : RiUser3Line }
                    text="Profile"
                    isActive={ Boolean(selected == "Profile") }
                    setSelected={ setSelected }
                    redirect={ "/profile" }
                />
                <SidebarOptions 
                    Icon={ FiMoreHorizontal }
                    text="More"
                    setSelected={ setSelected }
                    redirect={"/"} //Add the extra page 
                />
                <div className={style.postButton}>
                    Mint 
                </div>
            </div>
            <div className={style.profileButton}></div>
            <div className={style.profileLeft}></div>
            <div className={style.profileRight}></div>
            <div className={style.details}>
                <div className={style.name}>
                    manticorevault
                </div>
                <div className={style.address}>
                    0xbFa...EF50
                </div>
            </div>
        </div>
    )
}


export default Sidebar