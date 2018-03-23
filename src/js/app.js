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