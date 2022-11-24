import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { client } from "../lib/client";

export const SqrrlContext = createContext();

export const SqrrlProvider = ({ children }) => {
    const [appStatus, setAppStatus] = useState()
    const [currentAccount, setCurrentAccount] = useState("")
    const [nuts, setNuts] = useState("")

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

    const fetchNuts = async () => {
        const query = `
            *[_type == "nuts"] {
                "author": author->{name, walletAddress, profileImage, isProfileImageMint},
                nut, 
                timestamp
            }|order(timestamp desc)
        `

        const sanityResponse = await client.fetch(query)

        setNuts([])

        sanityResponse.forEach(async item => {
            const profileImageUrl = await getMintedProfileImage(
                item.author.profileImage,
                item.author.isProfileImageMint
            )

            if (item.author.isProfileImageMint) {
                const newItem = {
                    nut: item.nut,
                    timestamp: item.timestamp,
                    author: {
                        name: item.author.name,
                        walletAddress: item.author.walletAddress,
                        profileImage: profileImageUrl,
                        isProfileImageMint: item.author.isProfileImageMint
                    },
                }

                setNuts(prevState => [...prevState, newItem])
            } else {
                setNuts(prevState => [...prevState, item])
            }
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

        const response = await client.fetch(query)

        const profileImageUrl = await getMintedProfileImage(
            response[0].profileImage,
            response[0].isProfileImageMint,
        )

        setCurrentUser({
            nuts: response[0].nuts,
            name: response[0].name,
            profileImage: profileImageUri,
            walletAddress: response[0].walletAddress,
            coverPhoto: response[0].coverPhoto,
            isProfileImageMint: response[0].isProfileImageMint,
        })
    }

    return(
        <SqrrlContext.Provider value={{ 
            appStatus, 
            currentAccount, 
            connectToWallet,
            nuts,
            fetchNuts,
            setAppStatus,
            getMintedProfileImage,
            currentUser,
            getCurrentUserDetails,
        }}>
            { children }
        </SqrrlContext.Provider>
    )
}