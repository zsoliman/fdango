const baseUrl = 'http://localhost:3000/films'
const firstMovieUrl = 'http://localhost:3000/films/1'
const movieTitle = document.getElementById('title')
const runTime = document.getElementById('runtime')
const poster = document.getElementById('poster')
const showTime = document.getElementById('showtime')
const availableTickets = document.getElementById('ticket-num')
const description = document.getElementById('film-info')
const movieList = document.getElementById('films')
const btn = document.getElementById('buy-ticket')


const fetchFirstMovie = async () => {
    // GET request for 1st movie data
    let req = await fetch(firstMovieUrl)
    let res = await req.json()
    return res
}

const fetchAllMovies = async () => {
    // GET request for all movie data
    let req = await fetch(baseUrl)
    let res = await req.json()
    return res
}


const displayFirstMovie = async () => {
    // displays the first movie on page load
    let displayMovie = await fetchFirstMovie()
    let remainingTickets = `${displayMovie.capacity - displayMovie.tickets_sold}`

    poster.src = displayMovie.poster
    movieTitle.textContent = displayMovie.title
    runTime.textContent = `${displayMovie.runtime} minutes`
    showTime.textContent = displayMovie.showtime
    availableTickets.textContent = remainingTickets
    description.textContent = displayMovie.description

    btn.addEventListener('click', () => {
        // adds functionality to 'Buy Ticket' button
        if (remainingTickets > 0) {
            --remainingTickets
            availableTickets.textContent = remainingTickets
        }

        // bonus: should change button text to ' SOLD OUT ' when remainingTickets = 0, not working, breaks button.
        // if (remainingTickets = 0) {
        //     btn.innerText = ' SOLD OUT '
        // }

    })
}


const displayMovieMenu = async () => {
    // displays list of movies in the ul on the left
    let data = await fetchAllMovies()
    data.forEach((movie) => {
        let li = document.createElement('li')

        li.addEventListener('click', () => {
            // bonus: makes each movie clickable and displays its information
            let remainingTickets = `${movie.capacity - movie.tickets_sold}`

            poster.src = movie.poster
            movieTitle.textContent = movie.title
            runTime.textContent = `${movie.runtime} minutes`
            showTime.textContent = movie.showtime
            availableTickets.textContent = remainingTickets
            description.textContent = movie.description

            btn.addEventListener('click', () => {
                // adds functionality to 'Buy Ticket' button for each movie when clicked on
                if (remainingTickets > 0) {
                    --remainingTickets
                    availableTickets.textContent = remainingTickets
                }
            })
        })


        li.className = 'film item'
        li.textContent = movie.title
        movieList.append(li)

    })
}




displayFirstMovie()
displayMovieMenu()



