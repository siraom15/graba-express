$().ready(() => {
    var set_display_height = function () {
        var display_height = $(window).height()/2;
        $('#bg-half').height(display_height);
    };
    $(window).resize(function () {
        set_display_height();
    });
    set_display_height();
});