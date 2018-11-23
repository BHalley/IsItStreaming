const API_KEY = "AIzaSyBCVesxm4Kuui6ID14HPwDSYETR9CJeZ54"  //key=
const OMDB_KEY = "8cfc61d6" //apikey=
const YT_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet"
const OMDB_URL = "https://www.omdbapi.com/?"
const GUIDEBOX_URL = "https://api-public.guidebox.com/v2/search?"
const GUIDEBOX_KEY = "ec97bcc66bfa6f1fc5d73b51e4ca3a5c3c53f058";
var guideboxID;

//&q=%221roy4o4tqQM%22&key=AIzaSyBCVesxm4Kuui6ID14HPwDSYETR9CJeZ54

$("document").ready(function () {
    $("form").submit(function (event) {

        event.preventDefault();
        var searchQuery = $("#mySearch").val();
        window.localStorage.setItem("searchQuery", searchQuery);
        window.location.href = "landing.html";
    });

    if (localStorage.getItem("searchQuery") != "") {
        $.ajax({
            // url: YT_URL + searchQuery + "&key=" + API_KEY,
            url: OMDB_URL + "apikey=" + OMDB_KEY + "&s=" + window.localStorage.getItem("searchQuery"),
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < 10; i++) {
                var poster = $("<img>");
                if (response.Search[i].Poster === "N/A")
                    poster.attr("src", "assets/images/nopicture.gif");
                else
                    poster.attr("src", response.Search[i].Poster);
                poster.attr("alt", response.Search[i].Title);
                poster.attr("id", response.Search[i].imdbID);
                console.log(response.Search[i].Type);
                poster.attr("type", response.Search[i].Type);
                $("#searchResult").append(poster);
            }
            localStorage.setItem("searchQuery", "");
        });
    }





    // var videoDisp = $("<iframe allowfullscreen>");
    // videoDisp.attr("width",560);
    // videoDisp.attr("height",315);
    // videoDisp.attr("src","https://www.youtube.com/embed/"+response.items[0].id.videoId);
    // videoDisp.attr("frameborder",0);
    // videoDisp.attr("allow","accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");

    // $("#video_display").append(videoDisp);
});

$("body ").on("click", "img", function () {
    var guideboxType = $(this).attr("type"); //At this point, the guidebox type should be "series" or "movie".
                                             //Other types exist, but we don't care about those.
    if (guideboxType == "series"){
        guideboxType = "show";
        //Do ajax call specific for show.
    }
    else if (guideboxType == "movie"){
       
        $.ajax({
            // url: YT_URL + searchQuery + "&key=" + API_KEY,
            url: GUIDEBOX_URL + "api_key=" + GUIDEBOX_KEY + "&type=movies&field=id&id_type=imdb&query=" + this.id,
            method: "GET"
        }).then(function (response) {
            guideboxID = response.id;
            console.log("First response");
            console.log(reponse);
            $.ajax({
                // url: YT_URL + searchQuery + "&key=" + API_KEY,
                url: "https://cors-anywhere.herokuapp.com/https://api-public.guidebox.com/v2/movies/" + guideboxID + "?api_key=" + GUIDEBOX_KEY,
                method: "GET",
                dataType: "json",
                // this headers section is necessary for CORS-anywhere
               headers: {
                   "x-requested-with": "xhr"
               }
            }).then(function (response) {
                console.log(response);

                for (var i = 0; i < response.purchase_android_sources.length; i++)
                    console.log("Purchase android sources: " + response.purchase_android_sources[i].display_name);
                for (var i = 0; i < response.purchase_ios_sources.length; i++)
                    console.log("Purchase ios sources: " + response.purchase_ios_sources[i].display_name);
                for (var i = 0; i < response.purchase_web_sources.length; i++)
                    console.log("Purchase web sources: " + response.purchase_web_sources[i].display_name);


                for (var i = 0; i < response.subscription_android_sources.length; i++)
                    console.log("Subscription android sources: " + response.subscription_android_sources[i].display_name);
                for (var i = 0; i < response.subscription_ios_sources.length; i++)
                    console.log("Subscription ios sources: " + response.subscription_ios_sources[i].display_name);
                for (var i = 0; i < response.subscription_web_sources.length; i++)
                    console.log("Subscription web sources: " + response.subscription_web_sources[i].display_name);
            });

        });

    }
    // if (guideboxType === "show" || guideboxType === "movie") {
    //     console.log(this.id);
    //     console.log(guideboxType);

    //     $.ajax({
    //         // url: YT_URL + searchQuery + "&key=" + API_KEY,
    //         url: GUIDEBOX_URL + "api_key=" + GUIDEBOX_KEY + "&type=movies" + guideboxType + "&field=id&id_type=imdb&query=" + this.id,
    //         method: "GET"
    //     }).then(function (response) {
    //         guideboxID = response.id;
    //         $.ajax({
    //             // url: YT_URL + searchQuery + "&key=" + API_KEY,
    //             url: "https://cors-anywhere.herokuapp.com/https://api-public.guidebox.com/v2/movies/" + guideboxID + "?api_key=" + GUIDEBOX_KEY,
    //             method: "GET",
    //             dataType: "json",
    //             // this headers section is necessary for CORS-anywhere
    //             headers: {
    //                 "x-requested-with": "xhr"
    //             }
    //         }).then(function (response) {
    //             console.log(response);

    //             for (var i = 0; i < response.purchase_android_sources.length; i++)
    //                 console.log("Purchase android sources: " + response.purchase_android_sources[i].display_name);
    //             for (var i = 0; i < response.purchase_ios_sources.length; i++)
    //                 console.log("Purchase ios sources: " + response.purchase_ios_sources[i].display_name);
    //             for (var i = 0; i < response.purchase_web_sources.length; i++)
    //                 console.log("Purchase web sources: " + response.purchase_web_sources[i].display_name);


    //             for (var i = 0; i < response.subscription_android_sources.length; i++)
    //                 console.log("Subscription android sources: " + response.subscription_android_sources[i].display_name);
    //             for (var i = 0; i < response.subscription_ios_sources.length; i++)
    //                 console.log("Subscription ios sources: " + response.subscription_ios_sources[i].display_name);
    //             for (var i = 0; i < response.subscription_web_sources.length; i++)
    //                 console.log("Subscription web sources: " + response.subscription_web_sources[i].display_name);
    //         });

    //     });



    //    }
    else {
        console.log("Not streamable media.");
        console.log(guideboxType);
    }
    //Invalid search type.

});




//<iframe width="560" height="315" src="https://www.youtube.com/embed/u0pinrXp2LQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>