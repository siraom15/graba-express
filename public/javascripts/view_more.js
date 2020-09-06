$().ready(() => {
    let page = 1;
    var btn =  $("#seemore_btn");
    btn.click(() => {
        console.log("Clicked");
        ++page;
        $.get('/work/view_more/' + page, function (data) {
            console.log(this.btn);
            // let txt = '<div class="d-flex justify-content-center" id="seemore"><button class="btn btn-dark" id="seemore_btn"><div class="spinner-border text-danger text-center" role="status"> </div>ดูเพิ่มเติม</button></div>';
            // $("<div id='viewMore'></div>").insertAfter("#seemore");
            $("#viewMore").append(data)
            // $("#seemore").remove();
            // $(txt).insertAfter("#viewMore");
            // $("#viewMore").children()[0].focus();
            this.btn =  $("#seemore_btn");
        });
    });
})
