import React from 'react'
import Post from "../Post";

const style = {
  wrapper: `no-scrollbar`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

const nuts = [
  {
      displayName: "Artie",
      userName: "0xbFaA080663b550Fa648ECE4CeD5EF0658693EF50",
      avatar: "https://media.tenor.com/jMdv7eVShFoAAAAC/squirrel-pixel.gif",
      text: "All Blacks x Barbarians",
      isProfileImageMint: false,
      timestamp: "2022-02-14T12:00:00.000Z", 
  },
  {
      displayName: "Artie",
      userName: "0xbFaA080663b550Fa648ECE4CeD5EF0658693EF50",
      avatar: "https://media.tenor.com/jMdv7eVShFoAAAAC/squirrel-pixel.gif",
      text: "Watching a very cool rugby match",
      isProfileImageMint: false,
      timestamp: "2022-06-01T12:00:00.000Z", 
  },
  {
      displayName: "Artie",
      userName: "0xbFaA080663b550Fa648ECE4CeD5EF0658693EF50",
      avatar: "https://media.tenor.com/jMdv7eVShFoAAAAC/squirrel-pixel.gif",
      text: "Test",
      isProfileImageMint: false,
      timestamp: "2020-06-01T12:00:00.000Z", 
  }
]

const ProfileNuts = () => {
  return (
    <div className={ style.wrapper }>
      { nuts?.map((nut, index) => (
        <Post 
          key={ index }
          displayName="Artie"
          userName={`${ nut.userName.slice(0, 4)}...${nut.userName.slice(-4)}`}
          text={ nut.text }
          avatar={ nut.avatar }
          isProfileImageMint={ nut.isProfileImageMint }
          timestamp={ nut.timestamp }
        />
      )) }
    </div>
  )
}

export default ProfileNuts