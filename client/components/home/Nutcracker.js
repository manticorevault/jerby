import { useState, useContext } from "react"
import { client } from "../../lib/client";
import { SqrrlContext } from "../../context/SqrrlContext";

const style = {
    wrapper: `px-4 flex flex-row border-b border-[#38444d] pb-4`,
    nutcrackerLeft: `mr-4`,
    nutcrackerRight: `flex-1`,
    profileImage: `height-12 w-12 rounded-full`,
    inputField: `w-full h-full outline-none bg-transparent text-lg`,
    formLowerContainer: `flex`,
    iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
    icon: `mr-2`,
    submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
    inactiveSubmit: `bg-[#196195] text-[#95999e]`,
    activeSubmit: `bg-[#1d9bf0] text-white`
}

const Nutcracker = () => {

    const [nutMessage, setNutMessage] = useState("")
    const { currentAccount } = useContext(SqrrlContext)

    const postMessage = async (event) => {
        event.preventDefault()
        
        if(!nutMessage) return

        const nutId = `${currentAccount}_${Date.now()}`

        const nutDoc = {
            _type: "nuts",
            _id: nutId,
            nut: nutMessage,
            timestamp: new Date(Date.now()).toISOString(),
            author: {
                _key: nutId,
                _ref: currentAccount,
                _type: "reference",
            },
        }

        await client.createIfNotExists(nutDoc)

        await client
                .patch(currentAccount)
                .setIfMissing({ nuts: [] })
                .insert("after", "nuts[-1]", [
                    {
                        _key: nutId,
                        _ref: nutId,
                        _type: "reference",
                    },
                ]).commit()

        await fetchNuts()
        setNutMessage("");
    }

    return (
        <div className={style.wrapper}>
            <div className={style.nutcrackerLeft}>
                <img 
                    src="https://cdnb.artstation.com/p/assets/images/images/046/673/159/original/lucca-moura-esquilo-export.gif?1645667884"
                    alt="A pixel art squirrel as profile image"
                    className={ style.profileImage }
                />
            </div>
            <div className={style.nutcrackerRight}>
                <form>
                    <textarea 
                        className={style.inputField}
                        placeholder="What's going on now?"
                        value={nutMessage}
                        onChange={(e) => setNutMessage(e.target.value)}
                    />
                    <div className={style.formLowerContainer}>
                        <div className={style.iconsContainer}>
                            <button 
                                type="submit" 
                                disabled={!nutMessage}
                                onClick={(event) => postMessage(event)}
                                className={`${style.submitGeneral} ${
                                    nutMessage ? style.activeSubmit : style.inactiveSubmit
                                }`}
                            >
                                Nutcrack 
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    )

}

export default Nutcracker