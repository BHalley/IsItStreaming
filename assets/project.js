//https://www.googleapis.com/youtube/v3/search?part=snippet&key=put_your_api_key_here

const YT_API_KEY = "AIzaSyBCVesxm4Kuui6ID14HPwDSYETR9CJeZ54";
const YT_API_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet"
//&key=" + YT_API_KEY + "&part=snippet,contentDetails,statistics,status"

https://www.googleapis.com/youtube/v3/search?part=snippet&q="cats"&key=AIzaSyBCVesxm4Kuui6ID14HPwDSYETR9CJeZ54


$("document").ready(function () {
    $.ajax({
        url: YT_API_URL + "&key=" + YT_API_KEY,
        method: "GET"
    }).then(function(response){
        console.log(response);
    });
        
       
    






});