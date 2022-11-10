import Nutcracker from "./Nutcracker";
import { GiLeafSwirl } from "react-icons/gi"

const style = {
    wrapper: `flex-[2] border-r border-l border-[#38444d]`,
    header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold`
}

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
        </div>
    )
}

export default Timeline;