const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaire');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// step 1 create an empty array where all data have to put

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// step 2 fetch random user and money

//      function getRandomUser(){
//     fetch('https://randomuser.me/api').then(resp => resp.json()).then(data => )
// }
// we can also use async await for fetching

async function getRandomUser() {
    const url = await fetch('https://randomuser.me/api');
    const data = await url.json();
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };

    // console.log(newUser);
    addData(newUser)
}

// step 5 double money function
function doubleMoney() {
    data = data.map((user) => {

        return { ...user, money: user.money * 2 } //we want to return user as it is so we are using spread operatro
    });
    updateDom();
}
// step 6 sorting array by richest

function sortArray() {
    data.sort((a, b) => b.money - a.money);

    updateDom();
}
// step 7 millionare
function showingMillion() {
    data = data.filter(user => user.money > 1000000)

    updateDom();
}

// step 8 calculate wealth using reduce method
function totalWealth(){
    const wealth = data.reduce((acc, user)=> (acc +=user.money), 0);
    
    // console.log(formatMoney(wealth));


// for showimg on screen
   const wealthEl = document.createElement('div');
   wealthEl.innerHTML = `<h3> Total wealth : <Strong> ${formatMoney(wealth)}
   </strong></h3>`
        
       main.appendChild(wealthEl);
    }


// step 3 add new obj to data arr

function addData(obj) {
    data.push(obj);
    // update dom
    updateDom();
}

// update dom

function updateDom(providedData = data) {
    // clear the main div
    main.innerHTML = ' <h2> <strong>Person </strong> Wealth</h2>'
    // addind data to main,(displaying data )
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>  ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

// to display value as money - (12345.67).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
function formatMoney(number) {
    return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

}

// step 4 => adding event listeners
//    addding user method
addUserBtn.addEventListener('click', getRandomUser);

//    double money 

doubleBtn.addEventListener('click', doubleMoney)

// sort array

sortBtn.addEventListener('click', sortArray)

//millionare 

showMillionairesBtn.addEventListener('click', showingMillion) 

// total wealth
calculateWealthBtn.addEventListener('click', totalWealth)