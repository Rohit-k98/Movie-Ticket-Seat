const container = document.querySelector(`.people`);
const movieSelect = document.querySelector(".select");
const seat = document.querySelectorAll(".seat.Na-seat");
const count = document.getElementById(`yourSeat`);
const total = document.getElementById(`youPay`);
let ticketPrice = +movieSelect.value;
const whichMovie = document.getElementById(`whichMovie`);

PopulateUI();

// console.log(`Checking entry ... ... ...`, ticketPrice);

//Save Selected Movie and price to LocalStorage

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem(`selectedMovieIndex`, movieIndex);
    localStorage.setItem(`selectedMoviePrice`, moviePrice);

}

// Update selected seats

function updateSelectedSeat() {
    const selectedSeats = document.querySelectorAll(`.seat-row .Selected-seat`);
    const seatIndex = [...selectedSeats].map(function (input) {
        return [...seat].indexOf(input);
    })
    console.log(seatIndex);

    localStorage.setItem(`selectedSeats`, JSON.stringify(seatIndex));

    count.innerText = +selectedSeats.length;
    total.innerText = ticketPrice * count.innerText;


    // console.log(selectedSeats.length);
    // whichMovie.innerText=movieSelect.innerText;
    // console.log(`You have selected ${count.innerText} seats of ${ticketPrice} rs Movie. You need to pay ${total.innerText} `);
}

function PopulateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem(`selectedSeats`));
    const movieIndex = localStorage.getItem(`selectedMovieIndex`);
    const movieP = localStorage.getItem(`selectedMoviePrice`);
    console.log(selectedSeats, movieIndex, movieP);

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seat.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('Selected-seat');
            }
        });
    }
    if (movieIndex !== null) {
        movieSelect.selectedIndex = movieIndex;
    }



}

//Movie Selected Seat Cost
movieSelect.addEventListener(`change`, e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedSeat();

})

//Selecting Seats
container.addEventListener(`click`, (e) => {
    if (e.target.classList.contains(`seat`) && !e.target.classList.contains(`Occuoied-seat`)) {
        e.target.classList.toggle(`Selected-seat`);
    }
    updateSelectedSeat();
    console.log(ticketPrice * count.innerText);
    // updateSelectedSeatCost();
})

// Initial count and total set
updateSelectedSeat();