import Sidebar from "../components/Sidebar"
import Timeline from "../components/home/Timeline"

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#111827] text-[#00ff00]`,
  content: `max-w-[1440px] w-2/3 flex justify-between`
}

export default function Home() {
  return(
    <div className={style.wrapper}>
      <div className={style.content}>
        <Sidebar />

        <Timeline />

        <h2>
          Addons
        </h2>
      </div>
    </div>
  )
}
