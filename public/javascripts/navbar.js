$(function () {
    $(document).scroll(function () {
      var navbar = $(".fixed-top");
      navbar.toggleClass('scrolled-dark', $(this).scrollTop() > navbar.height());
      navbar.toggleClass('navbar-dark', $(this).scrollTop() > navbar.height());
    });
  });