import Search from '../../lib/search'

export default async (req, res) => {
    if (req.method == 'GET') {
        if (req.query.s == undefined) {
            res.send('Required "s" query!')
        } else {
            try {
                let data = await Search(req.query.s);
                if (data == null) {
                    res.json({ error: 'Do not match any page in Wikipedia with search: ' + req.query.s })
                } else {
                    res.json(data)
                }
            } catch (err) {
                res.json({ error: 'Some error happened. Try again latter.' })
            }
        }
    } else {
        res.status(404).end()
    }
}