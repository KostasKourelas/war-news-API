const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
var cors = require('cors')
const cheerio = require('cheerio')

const app = express()
app.use(cors())

const newspapers = [
    {
        id: 1,
        name: 'vima',
        address: 'https://www.tovima.gr/tag/polemos-stin-oukrania/',
        base: ''
    },
    {
        id: 2,
        name: 'euronews',
        address: 'https://gr.euronews.com/tag/war-in-ukraine',
        base: 'https://gr.euronews.com'
    },
    {
        id: 3,
        name: 'news247',
        address: 'https://www.news247.gr/polemos-stin-oykrania',
        base: '',
    },
    {
        id: 4,
        name: 'cnngr',
        address: 'https://www.cnn.gr/tag/polemos-oykrania',
        base: 'https://www.cnn.gr',
    },
    {
        id: 5,
        name: 'capital',
        address: 'https://www.capital.gr/tag/polemos-oukrania-rosia/',
        base: 'https://www.capital.gr',
    },
    {
        id: 6,
        name: 'kathimerini',
        address: 'https://www.kathimerini.gr/tag/polemos-stin-oykrania/',
        base: '',
    },
    {
        id: 7,
        name: 'thema',
        address: 'https://www.protothema.gr/tag/polemos-stin-oykrania/',
        base: ''
    },
    {
        id: 8,
        name: 'iefimerida',
        address: 'https://www.iefimerida.gr/tag/rosia-oykrania',
        base: ''
    },
    {
        id: 9,
        name: 'ethnos',
        address: 'https://www.ethnos.gr/tag/627/rosia',
        base: 'https://www.ethnos.gr'
    },
    {
        id: 10,
        name: 'ertnews',
        address: 'https://www.ertnews.gr/tag/polemos-stin-oykrania/',
        base: ''
    },
    {
        id: 11,
        name: 'thetoc',
        address: 'https://www.thetoc.gr/tags/polemos-oukrania-rosia/',
        base: ''
    },
    {
        id: 12,
        name: 'ot',
        address: 'https://www.ot.gr/tag/polemos-stin-oukrania/',
        base: ''
    },
    {
        id: 13,
        name: 'in',
        address: 'https://www.in.gr/tags/%CE%BF%CF%85%CE%BA%CF%81%CE%B1%CE%BD%CE%AF%CE%B1/',
        base: ''
    },
    {
        id: 14,
        name: 'tanea',
        address: 'https://www.tanea.gr/tag/%CE%BF%CF%85%CE%BA%CF%81%CE%B1%CE%BD%CE%AF%CE%B1/',
        base: ''
    },
    {
        id: 15,
        name: 'newsbeast',
        address: 'https://www.newsbeast.gr/tag/rwsia',
        base: 'https://www.newsbeast.gr'
    },
    {
        id: 16,
        name: 'documentonews',
        address: 'https://www.documentonews.gr/tag/polemos-sthn-oykrania/',
        base: ''
    },
    {
        id: 17,
        name: 'ieidiseis',
        address: 'https://www.ieidiseis.gr/show/tag/%CE%9F%CE%A5%CE%9A%CE%A1%CE%91%CE%9D%CE%99%CE%91',
        base: 'https://www.ieidiseis.gr'
    },
    {
        id: 18,
        name: 'parapolitika',
        address: 'https://www.parapolitika.gr/tag/rwsia-oykrania/',
        base: 'https://www.parapolitika.gr'
    },
    {
        id: 19,
        name: '902',
        address: 'https://www.902.gr/',
        base: ''
    }
   
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("ουκραν")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                
                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.name
                })
            })
        })
})

app.get('/', (req, res) => {
    res.json('Welcome to War News API')
})

app.get('/war-news', (req, res) => {
    res.json(articles)
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))
