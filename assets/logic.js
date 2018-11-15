const API_KEY = "AIzaSyBCVesxm4Kuui6ID14HPwDSYETR9CJeZ54"
const YT_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet"

//&q=%221roy4o4tqQM%22&key=AIzaSyBCVesxm4Kuui6ID14HPwDSYETR9CJeZ54

$("document").ready(function(){
    $("form").submit(function(event){
        event.preventDefault();
        var searchQuery = "&q="+$("#mySearch").val();

        $.ajax({
            url: YT_URL + searchQuery + "&key=" + API_KEY,
            method: "GET"
        }).then(function(response){
            
            var videoDisp = $("<iframe allowfullscreen>");
            videoDisp.attr("width",560);
            videoDisp.attr("height",315);
            videoDisp.attr("src","https://www.youtube.com/embed/"+response.items[0].id.videoId);
            videoDisp.attr("frameborder",0);
            videoDisp.attr("allow","accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
            
            $("#video_display").append(videoDisp);
        });
    });
});


//<iframe width="560" height="315" src="https://www.youtube.com/embed/u0pinrXp2LQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>