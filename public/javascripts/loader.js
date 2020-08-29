$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
        $.get("/load/data", function(data, status){
            alert("Data: " + data + "\nStatus: " + status);
          });
    }
});