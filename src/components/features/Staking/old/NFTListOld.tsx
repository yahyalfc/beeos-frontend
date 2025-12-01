/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React from 'react'

import  { type IArenaNFTResult, type IBeeOsResult } from '@/hooks/staking/useBeeOsStakingOld'

import NFTCardOld from './NFTCardOld'


interface NFTListProps {
    items: IBeeOsResult[] | IArenaNFTResult[]
    selected: string[]
    onSelect: (id: string) => void
    locked?: boolean
}

const NFTListOld: React.FC<NFTListProps> = ({ items, selected, onSelect, locked }) => {
    return (
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-5">
            {items.map(item => {
                const id = 'payload' in item ? item.payload?.tokenId : item.id
                return (
                    <NFTCardOld
                        key={id}
                        disabled={locked ? !('canUnlock' in item && item.canUnlock) : false}
                        item={item}
                        locked={locked}
                        selected={selected.includes(id)}
                        onSelect={onSelect}
                    />
                )
            })}
        </div>
    )
}

export default NFTListOld
