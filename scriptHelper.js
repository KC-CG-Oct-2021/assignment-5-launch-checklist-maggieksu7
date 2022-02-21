require('isomorphic-fetch');
    
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    let missionTarget=document.getElementById("missionTarget")
    missionTarget.innerHTML=`
                    <h2>Mission Destination</h2>
                    <ol>
                        <li>Name: ${name} </li>
                        <li>Diameter:${diameter} </li>
                        <li>Star: ${star}</li>
                        <li>Distance from Earth:${distance} </li>
                        <li>Number of Moons: ${moons}</li>
                    </ol>
                    <img src="${imageUrl}">`
}

function validateInput(testInput) {
    if(testInput===""){
        return "Empty"
    } else if (isNaN(Number(testInput))){
        return "Not a Number"
    } else {
        return "Is a Number"
    }
}

function formSubmission (document, pilot, copilot, fuelLevel, cargoMass) {
    pilot = document.querySelector("input[name=pilotName]").value;
    copilot = document.querySelector("input[name=copilotName]").value;
    fuelLevel = document.querySelector("input[name=fuelLevel]").value;
    cargoMass = document.querySelector("input[name=cargoMass]").value;
    let pilotStatus=document.getElementById("pilotStatus");
    let copilotStatus=document.getElementById("copilotStatus");
    let fuelStatus=document.getElementById("fuelStatus");
    let cargoStatus=document.getElementById("cargoStatus");
    let faultyItems=document.getElementById("faultyItems");
    let launchStatus=document.getElementById("launchStatus");

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty") {
        faultyItems.style.visibility = "hidden";
        launchStatus.innerHTML = "Awaiting Information Before Launch.<br>Please check field inputs.";
        launchStatus.style.color = "rgb(199, 37, 78)"
        alert("All fields are required!");
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number" || validateInput(fuelLevel) === "Not a Number" || validateInput(cargoMass) === "Not a Number") {
        faultyItems.style.visibility = "hidden";
        launchStatus.innerHTML = "Awaiting Information Before Launch.<br>Please check field inputs.";
        launchStatus.style.color = "rgb(199, 37, 78)"
        alert("All fields need valid information.");
    } else { 
        faultyItems.style.visibility = "visible";
        pilot.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilot.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        let launchStatus = document.getElementById("launchStatus");
        if (Number(fuelLevel) < 10000 && Number(cargoMass) < 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
        } else if (Number(fuelLevel) >= 10000 && Number(cargoMass) > 10000) {
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
        } else if (Number(fuelLevel) < 10000 && Number(cargoMass) > 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
        } else {
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            launchStatus.innerHTML = "Shuttle is Ready for Launch";
            launchStatus.style.color = "rgb(65, 159, 106)";
        }
    }
}

async function myFetch() {
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });
    return planetsReturned;
}

function pickPlanet(planets) {
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;