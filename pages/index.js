import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import Head from 'next/head'

import fetch from 'node-fetch'

const Home = () => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState(null)

    useEffect(() => {
        if (search == '') {
            setData(null)
        }
    }, [search])

    const getDataFromApiThenSetToState = async (e) => {
        setData(null)
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
            <main className={styles.container}>
                <form className={styles.form}>
                    <input type='search' value={search} onChange={e => setSearch(e.target.value)} className={styles.searchInput} placeholder='press enter to search' />
                    <input type='submit' value="" onClick={getDataFromApiThenSetToState} className={styles.submitInput} />
                </form>
                <a href="https://en.wikipedia.org/wiki/Special:Random" target="_blank" className={styles.randomLink}>go to a random wiki</a>
                <div className={styles.contents}>
                    {
                        data == null ? <></> :
                            data.map(d =>
                                <a className={styles.content} href={d.url} target='_blank' key={d.url} title="View on Wikipedia!">
                                    <p className={styles.title} key={d.title}>{d.title}</p>
                                    <p className={styles.description} key={d.description}>{d.description}</p>
                                </a>
                            )
                    }
                </div>
            </main>
        </>
    )
}

export default Home