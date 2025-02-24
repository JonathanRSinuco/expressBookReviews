let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {'0': { username: 'SomeBody', review: 'This is the a test review' }} },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

const getBooks = () => Promise.resolve(books)
const getBookbyID = (id) => Promise.resolve(books[id])
const getBookbyAuthor = (author) => new Promise((resolve,reject) => {
    let booksArray = Object.values(books)
    resolve(booksArray.filter((book) => book.author === author))    
})
const getBookbyTitle = (title) => new Promise((resolve,reject) => {
    let booksArray = Object.values(books)
    resolve(booksArray.filter((book) => book.title === title))
})
   
module.exports={
    getBooks, 
    getBookbyID,
    getBookbyAuthor,
    getBookbyTitle
};
