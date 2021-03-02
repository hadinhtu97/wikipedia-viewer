import styles from '../styles/Home.module.css'
import React, { useState } from 'react'
import Head from 'next/head'

import fetch from 'node-fetch'

const Home = () => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState(null)

    const getDataFromApiThenSetToState = async (e) => {
        e.preventDefault()
        if (search == '') {
            setData(null)
        } else {
            fetch('/api/search?s=' + search)
                .then(res => res.json())
                .then(data => {
                    if (data.hasOwnProperty('error')) {
                        setData(null)
                    } else {
                        setData(data)
                    }
                })
        }
    }

    return (
        <>
            <Head>
                <title>Wikipedia Viewer</title>
            </Head>
            <main>
                <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank">Random wiki</a>
                <form>
                    <input type='text' value={search} onChange={e => setSearch(e.target.value)} />
                    <input type='submit' value="Send" onClick={getDataFromApiThenSetToState} />
                </form>
                <div>
                    {
                        data == null ? <></> :
                            data.map(d =>
                                <a href={d.url} target='_blank' key={d.url}>
                                    <p key={d.title}>{d.title}</p>
                                    <p key={d.description}>{d.description}</p>
                                </a>
                            )
                    }
                </div>
            </main>
        </>
    )
}

export default Home