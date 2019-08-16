    var is_type = 'false';
    $(window).load(function () {
      $('html,body').animate({
        scrollTop: 0
      }, '1');
    });

    $(window).scroll(function () {
      $(".box1").each(function () {
        var position = $(this).offset().top;
        var scroll = $(window).scrollTop();
        if (scroll > position - 250) {
          $(".bg_gray1").fadeIn(600);
          $(".bg_gray_mask1").fadeIn(600);
          $(".red_border1").addClass("magictime puffIn");
          $(".point_pay_text1").addClass("magictime puffIn");
        }
        if (scroll < 100) {
          $(".bg_gray1").fadeOut();
          $(".bg_gray_mask1").fadeOut();
          $(".red_border1").removeClass("magictime puffIn");
          $(".point_pay_text1").removeClass("magictime puffIn");
          $("#tri1").removeClass("animated bounce");
        }
      });
    });

    $(window).scroll(function () {
      $("#tri0").each(function () {
        var position = $(this).offset().top;
        var scroll = $(window).scrollTop();
        if (scroll > position - 500) {
          $(this).addClass("animated bounce").css("border-top","30px solid red");
        }
        if (scroll < 100) {
          $(this).removeClass("animated bounce").css("border-top","");
        }
      });
    });

    $(window).scroll(function () {
      $("#tri1").each(function () {
        var position = $(this).offset().top;
        var scroll = $(window).scrollTop();
        if (scroll > position - 500) {
          $(this).addClass("animated bounce").css("border-top","30px solid red");
          setTimeout(function () {
            $(".todokesaki").addClass("animated bounce");
          }, 600);
          setTimeout(function () {
            $("#tri2").addClass("animated bounce").css("border-top","30px solid red");
          }, 1200);
        }
        if (scroll < 100) {
          $(this).removeClass("animated bounce").css("border-top","");
          $(".todokesaki").removeClass("animated bounce");
          $("#tri2").removeClass("animated bounce").css("border-top","");
        }
      });
    });

    $(window).scroll(function () {
      $(".box3").each(function () {
        var position = $(this).offset().top;
        var scroll = $(window).scrollTop();
        if (scroll > position - 250) {
          $(".bg_gray3").fadeIn(1000);
          $(".bg_gray_mask3").fadeIn(1000);
          $(".point_pay_text_box3").addClass("magictime puffIn");

          setTimeout(function () {
                $(".bg_gray_mask3_1").fadeIn(1200);
                $('.red_border3_1').addClass('magictime puffIn');
              }, 1000);

        }
        if (scroll < 100) {
          $(".bg_gray3").fadeOut(600);
          $(".bg_gray_mask3").fadeOut(600);
          $(".point_pay_text_box3").removeClass("magictime puffIn");
                $(".bg_gray_mask3_1").fadeOut(1200);
                $('.red_border3_1').removeClass('magictime puffIn');

        }
      });
    });

    $(window).on('load scroll', function (e) {
      var tjs = $(".box2").offset().top;
      var scroll = $(window).scrollTop();
      if (scroll > tjs - 250) {
        $(".bg_gray2").fadeIn(1000);
        $(".bg_gray_mask2").fadeIn(1000);
        $('.red_border2').addClass('magictime puffIn');

        if (is_type == 'true') {
          $(".box2 #js-target").t({
            speed: 60,
            speed_vary: true,
            init: function (elm) {
              console.log('init');
            },
            typing: function (elm, left, total) {
              console.log('typing');
            },
            fin: function (elm) {
              console.log('fin');

              setTimeout(function () {
                $(".bg_gray_mask2_1").fadeIn(1200);
                $('.red_border2_1').addClass('magictime puffIn');
              }, 500);

              setTimeout(function () {
                $("#tri3").addClass("animated bounce").css("border-top","30px solid red");
              }, 1700);

            }
          });

          is_type = 'false';
        }
      } else if (scroll < 100) {
        is_type = 'true';
        $(".bg_gray2").fadeOut(1000);
        $(".bg_gray_mask2").fadeOut(1000);
        $('.red_border2').removeClass('magictime puffIn');
        $(".bg_gray_mask2_1").fadeOut(1200);
        $('.red_border2_1').removeClass('magictime puffIn');
        $("#tri3").removeClass("animated bounce").css("border-top","");

      }
    });



    $(function () {
      $('a[href^="#"]').click(function () {
        const speed = 800;
        const href = $(this).attr("href");
        const target = $(href == "#" || href == "" ? "html" : href);
        const position = target.offset().top;
        $("html, body").animate({
          scrollTop: position - 50
        }, speed, "swing");
        return false;
      });
    });
