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