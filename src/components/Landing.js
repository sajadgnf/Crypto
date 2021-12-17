import React, { useEffect, useState } from 'react'

// component
import Coin from './Coin'
import Loarder from "./Loader"

// api
import { getCoin } from '../services/api'

// styles
import styles from "./Landing.module.css"

const Landing = () => {
    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        const fetchAPI = async () => {
            setCoins(await getCoin())
        }

        fetchAPI()
    }, [])

    const searchHnadler = event => {
        setSearch(event.target.value)
    }

    const searchCoins = coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <input className={styles.search} type="text" placeholder="Search" value={search} onChange={searchHnadler} />
            {
                coins.length ?
                    <div className={styles.container}>
                        {
                            searchCoins.map(coin => <Coin key={coin.id}
                                image={coin.image}
                                name={coin.name}
                                price={coin.current_price}
                                symbol={coin.symbol}
                                marketCap={coin.market_cap}
                                priceChanges={coin.market_cap_change_percentage_24h}
                            />)
                        }
                    </div> :
                    <Loarder />
            }
        </>
    )
}

export default Landing