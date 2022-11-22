import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";

export const SqrrlContext = createContext();

export const SqrrlProvider = ({ children }) => {
    const [appStatus, setAppStatus] = useState()
    const [currentAccount, setCurrentAccount] = useState("")

    const router = useRouter();

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    const checkIfWalletIsConnected = async () => {
        if(!window.ethereum) return setAppStatus("noMetamask")

        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            }) 
    
            if(addressArray.length > 0) {
                setAppStatus("connected")
    
                setCurrentAccount(addressArray[0])
                createUserAccount(addressArray[0])
    
            } else {
                router.push("/")
                setAppStatus("notConnected")
            }
        }
        catch(error) {
            router.push("/")
            setAppStatus("error")
        }


    }

    /* Starts Metamask wallet connection */
    const connectToWallet = async () => {
        if(!window.ethereum) return setAppStatus("noMetamask")

        try {
            setAppStatus("loading")

            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            })

            if(addressArray.length > 0) {
                setCurrentAccount(addressArray[0])
                createUserAccount(addressArray[0])
            } else {
                router.push("/")

                setAppStatus("notConnected")
            }

        } catch (error) {
            router.push("/")
            setAppStatus("error")
        }
    }

    const createUserAccount = async (userAddress = currentAccount) => {
        if(!window.ethereum) return setAppStatus("noMetamask")

        try {
            const userDoc = {
                _type: "users",
                _id: userAddress,
                name: "Chip 'n Dale",
                isProfileImageMint: false,
                profileImage: "https://cdnb.artstation.com/p/assets/images/images/046/673/159/original/lucca-moura-esquilo-export.gif?1645667884",
                walletAddress: userAddress
            }

            await client.createIfNotExists(userDoc)

            setAppStatus("connected")
        } catch (error) {
            router.push("/")
            setAppStatus("error")
        }
    }

    return(
        <SqrrlContext.Provider value={{ appStatus, currentAccount, connectToWallet}}>
            { children }
        </SqrrlContext.Provider>
    )
}