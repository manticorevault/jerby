import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";

export const SqrrlContext = createContext();

export const SqrrlProvider = ({ children }) => {
    const [appStatus, setAppStatus] = useState()
    const [currentAccount, setCurrentAccount] = useState("")
    const [currentUser, setCurrentUser] = useState("")
    const [nuts, setNuts] = useState("")

    const router = useRouter();

    useEffect(() => {
        checkIfWalletIsConnected()
    }, [])

    useEffect(() => {
        if (!currentAccount || appStatus === "connected") return
        
        getCurrentUserDetails(currentAccount)
        fetchNuts()
    }, [currentAccount, appStatus])

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

    const getMintedProfileImage = async (imageUri, isMint) => {
        if (isMint) {
            return `https://gateway.pinata.cloud/ipfs/${imageUri}`
        } else if (!isMint) {
            return imageUri
        }
    }

    const fetchNuts = async () => {
        const query = `
            *[_type == "nuts"] {
                "author": author->{
                    name, 
                    walletAddress, 
                    profileImage, 
                    isProfileImageMint},
                nut, 
                timestamp
            }|order(timestamp desc)
        `

        const sanityResponse = await client.fetch(query)

        setNuts([])

        sanityResponse.forEach(async (items) => {
            const profileImageUrl = await getMintedProfileImage(
                item.author.profileImage,
                item.author.isProfileImageMint
            )

            const newItem = {
                nut: item.nut,
                timestamp: item.timestamp,
                author: {
                    name: items.author.name,
                    walletAddress: items.author.walletAddress,
                    profileImage: items.profileImageUrl,
                    isProfileImageMint: items.author.isProfileImageMint
                },
            }
        
            setNuts(prevState => [...prevState, newItem])
        })
    }

    const getCurrentUserDetails = async (userAccount = currentAccount) => {
        if (appStatus !== "connected") return

        const query = `
            *[_type == "users" && _id == "${userAccount}"]{
                "nuts": nuts[]->{timestamp, nut}|order(timestamp desc),
                name,
                profileImage,
                isProfileImageMint,
                coverPhoto,
                walletAddress
            }
        `

        const sanityResponse = await client.fetch(query)

        setCurrentUser({
            nuts: sanityResponse[0].nuts,
            name: sanityResponse[0].name,
            profileImage: sanityResponse[0].profileImage,
            isProfileImageMint: sanityResponse[0].isProfileImageMint,
            coverPhoto: sanityResponse[0].coverPhoto,
            walletAddress: sanityResponse[0].walletAddress,
        })
    }

    return(
        <SqrrlContext.Provider value={{ 
            appStatus, 
            currentAccount, 
            connectToWallet,
            fetchNuts,
            nuts,
            currentUser,
            getCurrentUserDetails,
        }}>
            { children }
        </SqrrlContext.Provider>
    )
}