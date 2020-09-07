$(function () {
  var navbar = $(".fixed-top");
  $(document).scroll(function () {

    navbar.toggleClass('scrolled-dark', $(this).scrollTop() > navbar.height());
    navbar.toggleClass('navbar-dark', $(this).scrollTop() > navbar.height());
  });
  $("#navbar-toggler-btn-index").click(() => {
    navbar.toggleClass('scrolled-dark')
  })
  $("#navbar-toggler-btn-other").click(() => {
    navbar.toggleClass('navbar-dark')
    navbar.toggleClass('scrolled-dark')
  })
});