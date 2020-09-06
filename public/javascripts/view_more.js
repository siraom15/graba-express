$().ready(() => {
    let page = 1;
    var nearToBottom = 100;
    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - nearToBottom) {
            ++page;
            $.get('/work/view_more/' + page, function (data) {
                $("#viewMore").append(data)
                if (!data) {
                    $("#seemore_btn").hide();
                } else {
                    $("#seemore_btn").show();
                }
            });
        }
    });
})
