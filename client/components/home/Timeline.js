import Nutcracker from "./Nutcracker";
import { GiLeafSwirl } from "react-icons/gi";
import Post from "../Post";

const style = {
    wrapper: `flex-[2] border-r border-l border-[#38444d]`,
    header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold`
}

const nuts = [
    {
        displayName: "Artie",
        userName: "0xbFaA080663b550Fa648ECE4CeD5EF0658693EF50",
        avatar: "https://media.tenor.com/jMdv7eVShFoAAAAC/squirrel-pixel.gif",
        text: "Test",
        isProfileImageMint: false,
        timestamp: "2022-02-14T12:00:00.000Z", 
    },
    {
        displayName: "Artie",
        userName: "0xbFaA080663b550Fa648ECE4CeD5EF0658693EF50",
        avatar: "https://media.tenor.com/jMdv7eVShFoAAAAC/squirrel-pixel.gif",
        text: "Test",
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

function Timeline() {
    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <div className={style.headerTitle}>
                    Nest
                </div>
                <GiLeafSwirl />
            </div>
            <Nutcracker />

            {
                nuts.map((nut, index) => (
                    <Post 
                        key={ index }
                        displayName={ nut.displayName }
                        userName={`${nut.userName.slice(0,4)}...${nut.userName.slice(-4)}`}
                        avatar={ nut.avatar }
                        text={ nut.text }
                        isProfileImageMint={ nut.isProfileImageMint }
                    />
                ))
            }
        </div>
    )
}

export default Timeline;