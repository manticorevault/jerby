const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#111827] text-[#00ff00]`,
  content: `max-w-[1440px] w-2/3 flex justify-between`
}

export default function Home() {
  return(
    <div className={style.wrapper}>
      <div className={style.content}>
        <h2>
          Sidebar
        </h2>

        <h2>
          Timeline
        </h2>

        <h2>
          Addons
        </h2>
      </div>
    </div>
  )
}
