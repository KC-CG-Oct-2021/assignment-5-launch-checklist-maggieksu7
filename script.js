// Write your JavaScript code here!

window.addEventListener("load", function () {
    let list = document.querySelector("div[id=faultyItems]");
    list.style.visibility = "hidden";
    let form = document.querySelector("form");
    let listedPlanets;
    let listedPlanetsResponse = myFetch();

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {
        let planet = pickPlanet(listedPlanets);
        addDestinationInfo(document, planet["name"], planet["diameter"], planet["star"], planet["distance"], planet["moons"], planet["image"]);
    })

    const button=document.getElementById("formSubmit");
    button.addEventListener("click",function(e){
        e.preventDefault();
        let pilotStatus=document.getElementById("pilotStatus").value;
        let copilotStatus=document.getElementById("copilotStatus").value;
        let fuelStatus=document.getElementById("fuelStatus").value;
        let cargoStatus=document.getElementById("cargoStatus").value;
        formSubmission(document, pilotStatus, copilotStatus, fuelStatus, cargoStatus)
    });
});
