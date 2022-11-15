import React from 'react'
import SidebarOptions from "../components/SiderbarOptions";
import Addons from "../components/Addons";
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileNuts from '../components/profile/ProfileNuts';

const style ={
    wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-[#00ff00]`,
    content: `max-w-[1440px] w-2/3 flex justify-between`,
    mainContent: `flex-[2] border-r border-l border-[#38444d]`,
}

const profile = () => {
  return (
    <div className={ style.wrapper }>
        <div className={ style.content }>
          <div className={ style.mainContent }>
            <ProfileHeader />
            <ProfileNuts />
          </div>

          <Addons />

        </div>
    </div>
  )
}

export default profile