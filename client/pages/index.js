import { useContext } from "react";
import { SqrrlContext } from "../context/SqrrlContext";
import Sidebar from "../components/Sidebar";
import Timeline from "../components/home/Timeline";
import Addons from "../components/Addons";
import Image from "next/image";
import metamaskLogo from "../assets/metamask.png";
import errorImg from "../assets/error.png";

const style = {
  wrapper: `flex justify-center h-screen w-screen select-none bg-[#111827] text-[#00ff00]`,
  content: `max-w-[1440px] w-2/3 flex justify-between`,
  loginContainer: `w-full h-full flex flex-col justify-center items-center pb-48`,
  walletConnectButton: `text-2xl text-black bg-white font-bold mb-[-3rem] mt-[3rem] px-6 py-4 rounded-full cursor-pointer hover:bg-[#d7dbdc]`,
  loginContent: `text-3xl font-bold text-center mt-24`
}

export default function Home() {

  const { appStatus, connectToWallet } = useContext(SqrrlContext)

  const app = ( status = appStatus ) => {
    switch (status) {
      case "connected": 
        return userLoggedIn;

      case "notConnected":
        return noUserFoud;
      
      case "noMetamask":
        return noMetamaskFound;
      
      case "error":
        return error;
      
      default:
        return loading;
    }
  }

  const userLoggedIn = (
    <div className={ style.content }>
      <Sidebar initialSelectedIcon={"Nest"} />

      <Timeline />

      <Addons />
    </div>
  )

  const noUserFoud = (
    <div className={ style.loginContainer }>
      <Image
        src={ metamaskLogo }
        width={ 200 }
        height={ 200 }
      />

      <div
        className={ style.walletConnectButton }
        onClick={() => connectToWallet()}
      >
        Connect
      </div>
    </div>
  )

  const noMetamaskFound = (
    <div>
      <Image 
        src={ metamaskLogo }
        width={ 250 }
        height={ 200 }
      />
      <div className={ style.loginContent }>
      <a
        target="_blank"
        rel="noreferrer"
        href={ `https://metamask.io/download.html` }
      >
        This website uses Metamask web3 authentication. <br />
        Please, install Metamask and come back! (: )
      </a>
      </div>
    </div>
  )

  const error = (
    <div className={ style.loginContainer }>
      <Image 
        src={ errorImg }
        width={ 250 }
        height={ 200 }
      />
      <div className={ style.loginContent }>
        An error occurred. Please try again later or use another browser.
      </div>
    </div>
  )

  const loading = (
    <div className={ style.loginContainer }>
      <div className={ style.loginContent }>
        Loading...
      </div>
    </div>
  )

  return(
    <div className={style.wrapper}>
      { app(appStatus) }
    </div>
  )
}
