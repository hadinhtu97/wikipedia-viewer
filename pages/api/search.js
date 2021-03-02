import Search from '../../modules/search'

export default async (req, res) => {
    if (req.method == 'GET') {
        if (req.query.s == undefined) {
            res.send('Required search query!')
        } else {
            let data = await Search(req.query.s);
            if (data == null) {
                res.send('Do not match any page in Wikipedia with search: ' + req.query.s)
            } else {
                res.json(data)
            }
        }
    } else {
        res.status(404).end()
    }
}