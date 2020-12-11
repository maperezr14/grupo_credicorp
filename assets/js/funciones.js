jQuery(document).ready(function () {
  
  //Galeria
  // jQuery('.materialboxed').materialbox();

  // Acordeones
  // jQuery('.collapsible').collapsible();

  //Submenu inversionistas desktop
  // jQuery('.submenu-investors').hide();
  jQuery('.menu-option').on('mouseover', function (e) {
    jQuery('.submenu-investors').removeClass('open');
    jQuery('.submenu-investors').slideUp(300);
    jQuery('.has-submenu').removeClass('active');
  });
  jQuery('.has-submenu').on('mouseover', function (e) {
    jQuery(this).addClass('active');
    jQuery('.submenu-investors').addClass('open');
    jQuery('.submenu-investors').slideDown(300);
  });
  jQuery('.submenu-investors').on('mouseout', function (e) {
    jQuery(this).removeClass('open');
    jQuery(this).slideUp(300);
    jQuery('.has-submenu').removeClass('active');
  });

  // jQuery('.close-box').on('click', function (e) {
  //   jQuery('.lightbox-tyc').fadeOut(300)
  // });
  jQuery(window).scroll(function(){
    if( jQuery(this).scrollTop() > 0 ){
      jQuery('header').addClass('header-fixed');
    } else {
      jQuery('header').removeClass('header-fixed');
    }
  });
  //Menú Mobile
  jQuery('.sidenav-trigger').on('click', function (e) {
      jQuery(this).toggleClass('open');
      jQuery('#menu-mobile').toggleClass('open');
  });
  jQuery('#menu-mobile li.menu-item.menu-item-has-children').on('click', function (e) {
      jQuery(this).find('.dropdown-content').slideToggle(300);
  });
  //Slider Principal - Home
  jQuery('.fade').slick({
    arrows: true,
    dots: false,
    infinite: true,
    autoPlay: true,
    speed: 500,
    autoplaySpeed: 5000,
    fade: true,
    ccsEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    prevArrow: '<div class="slick-prev"><img src="assets/img/prev.png" alt="Previo" /></div>',
    nextArrow: '<div class="slick-next"><img src="assets/img/next.png" alt="Siguiente" /></div>' 
  });

  //Slider Empresas
  jQuery('.multiple-items').slick({
    arrows: false,
    dots: false,
    infinite: true,
    autoPlay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
      }
    }]  
  });



  jQuery('.sidenav-trigger').on('click', function(e){
    jQuery(".submenu").slideToggle(300);
  });
  jQuery('.more-option').on('click', function(e){
    jQuery(".dropdown-content").slideToggle(300);
  });
  $('select').formSelect();
  $('.collapsible').collapsible();
  $('.tabs').tabs();
  $('.modal').modal();
  //Filtro keywords
    $("#keywordSearch").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });



  $(function () {
    $('#sort-tabs').change(function () {
        $('.tabs-list').hide();
        $('#' + $(this).val()).css("display", "flex");
        // $('#' + $(this).val()).show().css("display", "flex");
    });

    var $divs = $('#formas-pago > div.forma-pago');
    $divs.first().show()
    $('input[type=radio].tipo-pago').on('change', function () {
        $divs.hide();
        $divs.eq($('input[type=radio].tipo-pago').index(this)).show();
    });

    $('#tipoComprador').change(function () {
        $('.datos-prop').hide();
        $('#' + $(this).val()).css("display", "flex");
        // $('#' + $(this).val()).show().css("display", "flex");
    });        
  }); 


checkScreenSize();

  function checkScreenSize(){
      var newWindowWidth = jQuery(window).width();
      if (newWindowWidth < 481) {
          jQuery(".tabs-content .tabs-list").addClass('list-mobile');
      }
      else
      {
        jQuery(".tabs-content .tabs-list").removeClass('list-mobile');
      }
  }

  $(function () {
      $('#sort-tabs').change(function () {
          $('.tabs-list').hide();
          $('#' + $(this).val()).show();
      });     
  }); 

  (function(jQuery) {
    var pagify = {
      items: {},
      container: null,
      totalPages: 1,
      perPage: 9,
      currentPage: 0,
      createNavigation: function() {
        this.totalPages = Math.ceil(this.items.length / this.perPage);

        jQuery('.pagination', this.container.parent()).remove();
        var pagination = jQuery('<div class="pagination"></div>').append('<a class="nav prev disabled" data-next="false"><i class="fas fa-chevron-left"></i></a>');

        for (var i = 0; i < this.totalPages; i++) {
          var pageElClass = "page";
          if (!i)
            pageElClass = "page current";
          var pageEl = '<a class="' + pageElClass + '" data-page="' + ( i + 1) + '">' + ( i + 1) + "</a>";
          pagination.append(pageEl);
        }
        pagination.append('<a class="nav next" data-next="true"><i class="fas fa-chevron-right"></i></a>');

        this.container.after(pagination);

        var that = this;
        jQuery("body").off("click", ".nav");
        this.navigator = jQuery("body").on("click", ".nav", function() {
          var el = jQuery(this);
          that.navigate(el.data("next"));
        });

        jQuery("body").off("click", ".page");
        this.pageNavigator = jQuery("body").on("click", ".page", function() {
          var el = jQuery(this);
          that.goToPage(el.data("page"));
        });
      },
      navigate: function(next) {
        // default perPage to 5
        if (isNaN(next) || next === undefined) {
          next = true;
        }
        jQuery(".pagination .nav").removeClass("disabled");
        if (next) {
          this.currentPage++;
          if (this.currentPage > (this.totalPages - 1))
            this.currentPage = (this.totalPages - 1);
          if (this.currentPage == (this.totalPages - 1))
            jQuery(".pagination .nav.next").addClass("disabled");
          }
        else {
          this.currentPage--;
          if (this.currentPage < 0)
            this.currentPage = 0;
          if (this.currentPage == 0)
            jQuery(".pagination .nav.prev").addClass("disabled");
          }

        this.showItems();
      },
      updateNavigation: function() {

        var pages = jQuery(".pagination .page");
        pages.removeClass("current");
        jQuery('.pagination .page[data-page="' + (
        this.currentPage + 1) + '"]').addClass("current");
      },
      goToPage: function(page) {

        this.currentPage = page - 1;

        jQuery(".pagination .nav").removeClass("disabled");
        if (this.currentPage == (this.totalPages - 1))
          jQuery(".pagination .nav.next").addClass("disabled");

        if (this.currentPage == 0)
          jQuery(".pagination .nav.prev").addClass("disabled");
        this.showItems();
      },
      showItems: function() {
        this.items.hide();
        var base = this.perPage * this.currentPage;
        this.items.slice(base, base + this.perPage).show();

        this.updateNavigation();
      },
      init: function(container, items, perPage) {
        this.container = container;
        this.currentPage = 0;
        this.totalPages = 1;
        this.perPage = perPage;
        this.items = items;
        this.createNavigation();
        this.showItems();
      }
    };

    // stuff it all into a jQuery method!
    jQuery.fn.pagify = function(perPage, itemSelector) {
      var el = jQuery(this);
      var items = jQuery(itemSelector, el);

      // default perPage to 5
      if (isNaN(perPage) || perPage === undefined) {
        perPage = 3;
      }

      // don't fire if fewer items than perPage
      if (items.length <= perPage) {
        return true;
      }

      pagify.init(el, items, perPage);
    };
  })(jQuery);

  jQuery(".list-release").pagify(15, ".item-release");

});