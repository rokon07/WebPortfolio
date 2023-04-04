/**
 * Author: Mohd Rokon
 * PSU ID: mar6897
 */

/**
 * depart() function is called when the use hits the search button with a city/airport in the input form.
 * It makes an API call to get all airports with the search query.
 */
function depart(){
    //API Get request: gets list of airports
    fetch(`https://skyscanner44.p.rapidapi.com/autocomplete?query=${document.getElementById("userCity").value}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner44.p.rapidapi.com", //API used is Skyscanner from RapidApi
            "x-rapidapi-key": "49ffb772cdmsh57dbac5898b6248p12ac4ejsn1e1ad2e3c6b3" //application unique key
        }
    })
    .then(response => response.json()) //get response in json
    .then(data => { //use the data from get request
        var i = 0;
        var select = document.getElementById('airportList'); //the options document element
        while (i < data.length){ //go over all the returned data and put them in the options list
            var opt = document.createElement('option'); //make option element to fill it with data of airport
            opt.value = data[i].iata_code;
            opt.innerHTML = data[i].name + " ( " + data[i].iata_code + ")"; //fill options list for user to choose from
            select.appendChild(opt);
            i++;
        }
        console.log(data);
    })
    .catch((error) => { //if request fails
        console.error('Error:', error);
    });

    //getCurrency(); // call to get all currencies user should be able to pick now
}

var currencyType = "USD"; //stores the currency to show price in
var allCurrency = new Map(); //store the list of currencies
/**
 * getCurrency() function: makes an API get request to get all the currencies for user to see prices in 
 * gets both the values and symbols
 */
function getCurrency() {
    //API Get request: gets list of currencies
    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/reference/v1.0/currencies", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner44.p.rapidapi.com", //API used is Skyscanner from RapidApi
            "x-rapidapi-key": "49ffb772cdmsh57dbac5898b6248p12ac4ejsn1e1ad2e3c6b3" //application unique key
        }
    })
    .then(response => response.json()) //get response in json
    .then(data => { //use the data from get request
        var i = 0;
        var select = document.getElementById('currencyList'); //get document element to populate
        while (i < data.Currencies.length) { //go over data retrieved
            var opt = document.createElement('option'); //make option element to fill it with data of currencies
            opt.value = data.Currencies[i].Code; //currency code to use in other API calls
            opt.innerHTML = data.Currencies[i].Code + " ( " + data.Currencies[i].Symbol + " )"; //add options showing user currency value and symbol
            allCurrency.set(data.Currencies[i].Code, data.Currencies[i].Symbol); //put the currency code and symbol in map
            select.appendChild(opt);
            i++;
        }
    })
    .catch(err => { //if request fails
        console.log(err);
    });
}


var depAirport; //stores the selected departing airport by user
/**
 * airport() function: get the user airport from the option selected in departure airport list.
 * Show the selected departing airport.
 */
function airport(){
    var elmnt = document.getElementById("elmnt"); 
    elmnt.remove(); //remove the initial null after the user has selected a airport
    depAirport = document.getElementById('airportList').value; //update this element
    var para = document.createElement("P"); //Create an element to show selected airport
    para.innerHTML = "Selected Airport: " + depAirport;
    document.getElementById("departResult").append(para); //put the element created in the diplay section 
    para.setAttribute("id", "elmnt");
}

var getDep; //stores the selected departing Date by user
/**
 * getDepDate() function: get the user departure date from the date calender.
 * Show the selected departing Date.
 */
function getDepDate() {
    var elmnt2 = document.getElementById("elmnt2");
    elmnt2.remove(); //remove the initial null after the user has selected a Date
    getDep = document.getElementById('depTime').value; //update this element
    var para = document.createElement("P"); //Create an element to show selected Date
    para.innerHTML = "Depart Date: " + getDep;
    document.getElementById("departResult").append(para); //put the element created in the diplay section 
    para.setAttribute("id", "elmnt2");
}

/**
 * arrive() function: is called when the use hits the search button with a city/airport in the input form of arrival section.
 * It makes an API call to get all airports with the search query.
 */
function arrive() {
    //API Get request: gets list of airports
    fetch(`https://skyscanner44.p.rapidapi.com/autocomplete?query=${document.getElementById("userCityArrive").value}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner44.p.rapidapi.com", //API used is Skyscanner from RapidApi
            "x-rapidapi-key": "49ffb772cdmsh57dbac5898b6248p12ac4ejsn1e1ad2e3c6b3" //application unique key
        }
    })
    .then(response => response.json()) //get response in json
    .then(data => { //use the data from get request
        var i = 0;
        var select = document.getElementById('airportListArrive'); //the options document element
        while (i < data.length) { //go over all the returned data and put them in the options list
            var opt = document.createElement('option'); //make option element to fill it with data of airport
            opt.value = data[i].iata_code;
            opt.innerHTML = data[i].name + " ( " + data[i].iata_code + ")"; //fill options list for user to choose from
            select.appendChild(opt);
            i++;
        }
        //console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error); //if request fails
    });
}

var arriveAirport; //stores the selected arriving airport by user
/**
 * airportArrive() function: get the user airport from the option selected in arrive airport list.
 * Show the selected arrive airport.
 */
function airportArrive() {
    var elmnt3 = document.getElementById("elmnt3");
    elmnt3.remove(); //remove the initial null after the user has selected a airport
    arriveAirport = document.getElementById('airportListArrive').value; //update this element
    var para = document.createElement("P"); //Create an element to show selected airport
    para.innerHTML = "Selected Airport: " + arriveAirport;
    document.getElementById("arriveResult").appendChild(para); //put the element created in the diplay section 
    para.setAttribute("id", "elmnt3");
}

var getArrive; //stores the selected arrive Date by user
/**
 * getArrive() function: get the user arrive date from the date calender.
 * Show the selected arrive Date.
 */
function getArriveDate() {
    var elmnt4 = document.getElementById("elmnt4");
    elmnt4.remove();//remove the initial null after the user has selected a Date
    getArrive = document.getElementById('arriveTime').value; //update this element
    var para = document.createElement("P"); //Create an element to show selected Date
    para.innerHTML = "Arrive Date: " + getArrive;
    document.getElementById("arriveResult").appendChild(para); //put the element created in the diplay section 
    para.setAttribute("id", "elmnt4");
}

/**
 * getResult() function: shows the flight prices and date.
 * Makes an API get request which gets all the prices, dates and airlines.
 * Takes user input such as depart airport/date, arrive airport/Date and currency to show data.
 */
function getResult(){
    currencyType = document.getElementById('currencyList').value; //get the currency selected by the user
    var currencyTypeSymbol = "$"; //currency symbol to show prices in
    for (let [key, val] of allCurrency) { //go over all currencies to get the symbol
        if (currencyType == key) {
            currencyTypeSymbol = val;
        }
    }

    var currDate = new Date().toISOString().slice(0, 10); //get today's date

    /**
    if(depAirport == null){ //user must pick a departure airport
        alert("Please pick a departure airport!"); //show error if not selected
    }
    if (getDep == null) { //user must pick a departure Date
        alert("Please pick a departure date!"); //show error if not selected
    }
    if (arriveAirport == null) { //user must pick a Arrive airport
        alert("Please pick a arrival airport!"); //show error if not selected
    }
    if (Date.parse(currDate) > Date.parse(getDep)){ //the departure date cannot be ealier than current date
        alert(`Departure date cannot be ealier than current date! Please pick a date later than or on ${currDate}.`);
    }
    if (Date.parse(currDate) > Date.parse(getArrive) || Date.parse(getArrive) < Date.parse(getDep)) { //arive date cannot be earlier than todays date or departure date
        alert("Error! Arrival date cannot be earlier than current date or departure date.");
    }

    **/

    //API get request takes parameters: currency, language, arrival airport, departure Airport, departure date and arrival date
    fetch(`https://skyscanner44.p.rapidapi.com/search-extended?adults=1&origin=IAD&destination=LHR&departureDate=2023-04-01&returnDate=2023-04-10&currency=EUR`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "skyscanner44.p.rapidapi.com", //API used is Skyscanner from RapidApi
            "x-rapidapi-key": "49ffb772cdmsh57dbac5898b6248p12ac4ejsn1e1ad2e3c6b3" //application unique key
        }
    })
    .then(response => response.json()) //get response in json
    .then(data => { //use the data from get request
        //console.log(data);

        /**
        var carriers = new Map(); //stores all airlines with flights avaiable
        var i;
        for (i = 0; i < data.Carriers.length; i++) { //go over airlines list
            carriers.set(data.Carriers[i].CarrierId, data.Carriers[i].Name); //store in the map with name and airline ID
        }*/

        var count = 0;
        var j;
        const dataJson = data.itineraries.results;

        for (let i = 0; i < dataJson.length; i++) {
            const pricingOptions = dataJson[i].pricing_options;
            for (let j = 0; j < pricingOptions.length; j++) {
                const priceAmount = pricingOptions[j].price.amount;
                console.log(priceAmount);
            }
        }

        const legs = itinerary.itineraries.results[0].legs;

        for (let i = 0; i < legs.length; i++) {
            const leg = legs[i];
            console.log(`Stop count: ${leg.stopCount}`);
            const marketing = leg.carriers.marketing[0];
            console.log(`Marketing carrier name: ${marketing.name}`);
        }


        for(j = 0; j < data.itineraries.length; j++) { //go over all the quotes
            console.log(data[1]);
            var fixTable = Math.random(100); //need to create quotes rows with unique IDs
            var time = data.Quotes[j].OutboundLeg.DepartureDate; 
            var carrier = data.Quotes[j].OutboundLeg.CarrierIds; //get carrier Ids for flights
            if (Date.parse(time) > Date.parse(getDep) && Date.parse(time) < Date.parse(getArrive)){ //the flights have to be in range of departure date and arrival date
                var tableRow = document.createElement("tr"); //make a row entry for result table
                tableRow.setAttribute("id", `tableElement${j + fixTable}`); //set unique Id for each flight found
                document.getElementById("resultTable").appendChild(tableRow); //put the row in the result table

                var tableDate = document.createElement("td"); //create a row entry
                tableDate.innerHTML = time.substring(0,10); //format date

                var carrierName; //get carrier name for flights from the airline carriers map
                for (let [k, v] of carriers) { 
                    if(carrier == k){
                        carrierName = v;
                        carrierNameWithoutSpace = carrierName.replace(/\s/g, ''); //get name of airline which matches flight with format
                    }
                }
                var tableAirline = document.createElement("td"); //put carrier name entry in row
                tableAirline.innerHTML = carrierName;

                var tablePrice = document.createElement("td"); //put flight price entry in row
                tablePrice.innerHTML = currencyTypeSymbol + data.Quotes[j].MinPrice + ".00";

                var directCheck= data.Quotes[j].Direct; //check if flights are direct or indirect
                if (data.Quotes[j].Direct){
                    directCheck = "Yes";
                }
                else{
                    directCheck = "No";
                }
                var tableDirect = document.createElement("td"); //put direct/indirect entry in row
                tableDirect.innerHTML = directCheck;

                var tableLink = document.createElement("td"); //put link to buy tickets entry in row
                tableLink.setAttribute("id", `tableLink${j + fixTable}`);

                tableLink.innerHTML = `<a target="_blank" rel="noopener noreferrer" href="http://www.${carrierNameWithoutSpace}.com">Buy Tickets</a>`;
                //add the entries in each row
                document.getElementById(`tableElement${j+ fixTable}`).appendChild(tableDate); 
                document.getElementById(`tableElement${j+ fixTable}`).appendChild(tableAirline);
                document.getElementById(`tableElement${j+ fixTable}`).appendChild(tablePrice);
                document.getElementById(`tableElement${j+ fixTable}`).appendChild(tableDirect);
                document.getElementById(`tableElement${j+ fixTable}`).appendChild(tableLink);  

                count++;
            }
        }
        if (count == 0) { //if no results are found show alert
            alert("No results");
        }
    })
    .catch(err => { //if request fails
        console.log(err);
    });
}


/**
 * resetResult() function: resets the result table to get new results for different parameters
 */
function resetResult(){
    var clearDiv = document.getElementById("resultTable");
    clearDiv.innerHTML = ""; //clear previous data
    var createHeaders = document.createElement("tr"); //recreate the headers of the table
    createHeaders.setAttribute("id", "tableHeaders");
    document.getElementById("resultTable").appendChild(createHeaders);
    createHeaders.innerHTML = `<th>Date</th>
                        <th>Airline</th>
                        <th>Price</th>
                        <th>Direct</th>
                        <th>link</th>`;
}