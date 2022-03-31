var info = document.getElementById("info");
var img = document.getElementById("picture");
var images = ["a10.jpg", "f16.jpg", "lch.jpg", "mig31.png"];
var description = ["Highly maneuverable A-10 Warthog", "Combat Tested F-16 Fighting Falcon", "Made in India! Light Combat Helicopter", "The Russian MiG-31"];
var index = 0;
var len = images.length;

function changePicture() {
    setInterval(
        function() {
            index = (index + 1) % len;
            info.innerHTML = "New Product!\n<br><br>" + description[index];
            img.style.background = "url(assets/products/"+images[index]+")";
            img.style.backgroundPosition = "center";
            img.style.backgroundSize = "cover";
            console.log(images[index]);
        }
    , 3000);
}

function changeCategory(type) {
    //Fetch JSON data using http
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(xhttp.responseText);
            var myarray = response.aircrafts;

            console.log(type);

            if (type == "vehicles") {
                myarray = response.vehicles;
            }
            else if (type == "firearms") {
                myarray = response.firearms;
            }

            var output = "";
            for (var i = 0; i < myarray.length; i++) {
                output += "<div class='productcard'>" + 
                                "<img src="+myarray[i].image+" width='250px' height='270px'>" +
                                "<div id='name' class='productinfo'>"+myarray[i].name+"</div>" +
                                "<div id='price' class='productinfo'>"+"Rs. "+myarray[i].price+"</div>" +
                                "<button>Add to Cart</button>" +
                        "</div>";
            }
            document.getElementById("productarea").innerHTML = output;
        }
    };
    xhttp.open("GET", "products.json", true);
    xhttp.send();
}