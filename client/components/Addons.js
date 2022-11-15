import React from 'react'

import { ads, whoCreatedIt } from "../lib/ads";
import { BiSearch } from "react-icons/bi";
 
const style = {
    wrapper: `flex-[1] p-4`,
    searchBar: `flex items-center bg-[#243340] p-2 rounded-3xl`,
    searchIcon: `text-[#8899a6] mr-2`,
    inputBox: `bg-transparent outline-none`,
    section: `bg-[#192734] my-6 rounded-xl overflow-hidden`,
    title: `p-2 font-bold text-lg`,
    showMore: `p-2 text-[#1d9bf0] text-sm cursor-pointer hover:bg-[#22303c]`,
    item: `flex items-center p-3 my-2 hover:bg-[#22303c] cursor-pointer`,
    adsItemLeft: `flex-1`,
    adsItemCategory: `text-[#8899a6] text-xs font-semibold`,
    adsItemTitle: `text-sm font-bold`,
    adsItemRight: `w-1/5 ml-3`,
    adsItemImage: `rounded-xl h-14 w-14 object-cover`,
    profileDetails: `flex-1`,
    name: `font-bold`,
    address: `text-[#8899a6]`
  }
const Addons = () => {
  return (
    <div className={ style.wrapper }>
        <div className={ style.searchBar }>
            <BiSearch className={ style.searchIcon } />
            <input 
                type="text" 
                placeholder="Search..." 
                className={ style.inputBox }
                />
        </div>
        
        <div className={ style.section }> 
            <div className={ style.title }>
                What is going on now?
                { ads.map(( item, index ) => (
                    <div 
                        key={ index } 
                        className={ style.item }
                    >
                        <div className={ style.adsItemLeft }>
                            <div className={ style.adsItemCategory }> 
                                { item.category }
                            </div>
                            <div className={ style.adsItemTitle }>
                                { item.title }    
                            </div>    
                        </div>
                        <div className={ style.adsItemRight }>
                            <img
                                src={ item.image }
                                alt={ item.category }
                                className={ style.adsItemImage } 
                            />
                        </div>  
                    </div>
                )) }
                <div className={ style.showMore }>
                    Show more
                </div>
                <div className={ style.section }>
                    <div className={ style.title }>
                        Created by:
                        <div className={ style.name }>
                            Artur Serra
                        </div>
                        <div className={ style.address }>
                            0xbFaA080663b550Fa648ECE4CeD5EF0658693EF50
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Addons