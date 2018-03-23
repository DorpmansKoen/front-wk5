// JAVASCRIPT
(function () {
    // dom volledig klaar
    document.addEventListener("DOMContentLoaded", init);

    function init() {
        http.get('https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json').then(function (response) {
             console.info(response); // Returns parsed json

            parkingsArray = [];
            for (let i = 0, l = response.length; i < l; i++) {
                let p = new Parking(
                    response[i].name,
                    response[i].description,
                    response[i].parkingStatus.availableCapacity,
                    response[i].parkingStatus.totalCapacity,
                    response[i].longitude,
                    response[i].latitude
                );
                parkingsArray.push(p);
            }

            http.initMap(parkingsArray);
            renderHtml(parkingsArray);
        });
    }



    function renderHtml(parkings) {
        //console.log(parkings); // Returns parking Objects

        let bobTheHtmlBuilder = ``;
        for (let i = 0, l = parkings.length; i < l; i++) {
            bobTheHtmlBuilder += `
            <li class="parkings__parking ${renderAvailabilityClass(parkings[i].availableCapacity, parkings[i].totalCapacity)}">
            <div class="parkings__parking__logo">P</div>
            <div class="parkings__parking__name">${parkings[i].name}</div>
            <div class="parkings__parking__info">${parkings[i].availableCapacity} / ${parkings[i].totalCapacity} </div>
            </li>`;
        }
        document.querySelector(".parkings").innerHTML = bobTheHtmlBuilder
    }

    function renderAvailabilityClass(avail, total){
        if(avail == 0){            
            return "error";
        }
        let result = total - avail;
        if (result < total / 2){
            return "danger";
        }
    }


})();
// Object
// let p = new Parking(name, description, availableCapacity, totalCapacity)

function Parking(name, description, availableCapacity, totalCapacity, longitude, latitude) {
    this.name = name;
    this.description = description;
    this.availableCapacity = availableCapacity;
    this.totalCapacity = totalCapacity;
    this.longitude = longitude;
    this.latitude = latitude;
}
// Library http.get
(function () {
    "use strict"
    function get(url) {
        let promise = new Promise(function (ok, nok) {
            let xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", url);
            xmlHttp.onload = () => {
                let json = JSON.parse(xmlHttp.responseText);
                ok(json);
            };
            xmlHttp.onerror = () => {
                nok("iets is misgelopen, contacteer de admin")
            };
            xmlHttp.send(null);
        });
        return promise;
    }

    function map(parkings) {
        var gent = { lat: 51.052975, lng: 3.727059 };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: gent
        });


        for (let i = 0, l = parkings.length; i < l; i++) {
            var coords = { lng: parkings[i].longitude, lat: parkings[i].latitude }
            var marker = new google.maps.Marker({
                position: coords,
                map: map,
                icon: markerColor(parkings[i])
            });
        }
    }

    function markerColor(parking) {        
        var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + 
        AvailabilityColor(parking.availableCapacity, parking.totalCapacity),
            new google.maps.Size(21, 34),
            new google.maps.Point(0, 0),
            new google.maps.Point(10, 34));
            return pinImage;
    }

    function AvailabilityColor(avail, total){
        let result = total - avail;
        if (result < total / 2){
            return "FF6e00";
        }
        else{
            return "4169e1";
        }
    }

    window.http = {
        get: get,
        initMap: map
    };



})();