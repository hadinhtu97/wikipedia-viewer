import fetch from 'node-fetch'

const search = async (search) => {
    let api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + search
    let res = await fetch(api)
    let data = await res.json()
    if (!data.hasOwnProperty('query')) {
        return null
    } else {
        return Object.keys(data.query.pages).map(key => {
            return {
                title: data.query.pages[key].title,
                description: data.query.pages[key].extract,
                url: 'https://en.wikipedia.org/wiki/' + data.query.pages[key].title.split(' ').join('_')
            }
        })
    }
}

export default search