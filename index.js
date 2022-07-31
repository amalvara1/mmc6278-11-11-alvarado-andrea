const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = ([
  {
    title,
    author,
    lines
  }
]) => {
const createTitle = makeTag('h2')(title)
const byTag = makeTag('em')
const authorTag = makeTag('h3')
const showAuthor = pipe(byTag, authorTag)(`by ${author}`)
const linesTag = makeTag('p')(lines)


let stanza = []
let poemArr = []

lines.forEach((line,index) => {
  if(!line){
    poemArr.push(stanza)
    stanza= []
  } else if (index === lines.length -1) {
    stanza.push(line)
    poemArr.push(stanza)
  } else {
    stanza.push(line)
  } 
});

let string = ""
poemArr.forEach( bArr => {
  string+=makeTag("p")(bArr.join('<br>'))
})


return `${createTitle}${showAuthor}${string}`
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
