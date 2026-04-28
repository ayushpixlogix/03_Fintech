/* Custom General jQuery
/*--------------------------------------------------------------------------------------------------------------------------------------*/
(function ($, window, document, undefined) {
  //Genaral Global variables
  //"use strict";
  var $doc = $(document);
  var $winW = function () {
    return $(window).width();
  };

  var screencheck = function (mediasize) {
    if (typeof window.matchMedia !== "undefined") {
      var screensize = window.matchMedia("(max-width:" + mediasize + "px)");
      return screensize.matches;
    } else {
      // for IE9 and lower browser
      if ($winW() <= mediasize) {
        return true;
      } else {
        return false;
      }
    }
  };

  $doc.ready(function () {
    /*--------------------------------------------------------------------------------------------------------------------------------------*/
    // Remove No-js Class
    $("html").removeClass("no-js").addClass("js");

    // Get header height and set padding top to body
    const headerHeight = () => {
      if ($("#header").length) {
        var headerHeight = Math.floor($("#header").outerHeight());
        document
          .querySelector(":root")
          .style.setProperty("--headerHeight", headerHeight + "px");
      }
    };
    window.addEventListener("resize", headerHeight);
    headerHeight();

    // 100vh height get in pexels
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--appHeight", `${window.innerHeight}px`);
    };
    window.addEventListener("resize", appHeight);
    appHeight();

    /* Menu ICon Append prepend for responsive
		---------------------------------------------------------------------*/
    $(window)
      .on("resize", function () {
        if (screencheck(768)) {
          if (!$("#menu").length) {
            $("#mainmenu").prepend(
              '<a href="#" id="menu" class="menulines-button" aria-label="Toggle navigation" aria-expanded="false"><span></span><span></span><span></span><span></span></a>',
            );
          }
        } else {
          $("#menu").remove();
          $("#mainmenu > ul").removeAttr("style");
        }
      })
      .resize();

    /* Mobile menu click
		---------------------------------------------------------------------*/
    $(document).on("click", "#menu", function () {
      var $menuButton = $(this);
      var $menuList = $menuButton.next("ul");
      var isOpen = $menuButton.hasClass("open");

      $menuButton.toggleClass("open").attr("aria-expanded", String(!isOpen));
      $menuList.slideToggle("normal");
      return false;
    });

    $(document).on("click", "#mainmenu ul a", function () {
      if (screencheck(768) && $("#menu").length) {
        $("#menu").removeClass("open").attr("aria-expanded", "false");
        $("#mainmenu > ul").slideUp("normal");
      }
    });

    /* Tab Content box 
		---------------------------------------------------------------------*/
    var tabBlockElement = $(".tab-data");
    $(tabBlockElement).each(function () {
      var $this = $(this),
        tabTrigger = $this.find(".tabnav li"),
        tabContent = $this.find(".tabcontent");
      var textval = [];
      tabTrigger.each(function () {
        textval.push($(this).text());
      });
      $this.find(tabTrigger).first().addClass("active");
      $this.find(tabContent).first().show();

      $(tabTrigger).on("click", function () {
        $(tabTrigger).removeClass("active");
        $(this).addClass("active");
        $(tabContent).hide().removeClass("visible");
        var activeTab = $(this).find("a").attr("data-rel");
        $this
          .find("#" + activeTab)
          .fadeIn("normal")
          .addClass("visible");

        return false;
      });

      var responsivetabActive = function () {
        if (screencheck(767)) {
          if (!$this.find(".tabMobiletrigger").length) {
            $(tabContent).each(function (index) {
              $(this).before(
                "<h2 class='tabMobiletrigger'>" + textval[index] + "</h2>",
              );
              $this.find(".tabMobiletrigger:first").addClass("rotate");
            });
          }
        } else {
          if ($(".tabMobiletrigger").length) {
            $(".tabMobiletrigger").remove();
            tabTrigger.removeClass("active");
            $this
              .find(tabTrigger)
              .removeClass("active")
              .first()
              .addClass("active");
            $this.find(tabContent).hide().first().show();
          }
        }
      };
      $(window)
        .on("resize", function () {
          if (!$this.hasClass("only-tab")) {
            responsivetabActive();
          }
        })
        .resize();
    });

    $(document).on("click", ".tabMobiletrigger", function () {
      var $this = $(this),
        $tabBlock = $this.parents(".tab-data");
      var tabAcoordianData = $(this).next(".tabcontent");
      if ($(tabAcoordianData).is(":visible")) {
        $(this).removeClass("rotate");
        $(tabAcoordianData).slideUp("normal");
      } else {
        $tabBlock.find(".tabMobiletrigger").removeClass("rotate");
        $(this)
          .parents(".tab-data")
          .find(".tabcontent")
          .not(tabAcoordianData)
          .slideUp("normal");
        $(this).addClass("rotate");
        $(tabAcoordianData).not(":animated").slideDown("normal");
      }
      return false;
    });

    /* Accordion box JS
		---------------------------------------------------------------------*/
    $(".accordion-databox").each(function () {
      var $accordion = $(this),
        $accordionTrigger = $accordion.find(".accordion-trigger"),
        $accordionDatabox = $accordion.find(".accordion-data");

      $accordionTrigger.first().addClass("open");
      $accordionDatabox.first().show();

      $accordionTrigger.on("click", function (e) {
        var $this = $(this);
        var $accordionData = $this.next(".accordion-data");
        if (
          $accordionData.is($accordionDatabox) &&
          $accordionData.is(":visible")
        ) {
          $this.removeClass("open");
          $accordionData.slideUp(400);
          e.preventDefault();
        } else {
          $accordionTrigger.removeClass("open");
          $this.addClass("open");
          $accordionDatabox.slideUp(400);
          $accordionData.slideDown(400);
        }
      });
    });

    /* Header Sticky
		---------------------------------------------------------------------*/
    if ($("#header").length) {
      var toggleStickyHeader = function () {
        if ($(window).scrollTop() > 0) {
          $("#header").addClass("sticky");
        } else {
          $("#header").removeClass("sticky");
        }
      };

      $(window).on("scroll", toggleStickyHeader);
      toggleStickyHeader();
    }

    // For scroll animation
    if ($(".ani-element").length) {
      const cards = document.querySelectorAll(".ani-element");
      const observer = new IntersectionObserver(
        (entries) => {
          // console.log(entries[0]);
          entries.forEach((entry) => {
            entry.target.classList.toggle("show", entry.isIntersecting);
            // IF THE ELEMENT IS INTERSECTING, ADD THE CLASS SHOW
            if (entry.isIntersecting) observer.unobserve(entry.target);
          });
        },
        {
          // root: document.querySelector('#scrollArea'), //This will be scrollble area like body or div
          rootMargin: "0px 0px -150px 0px", // This will be margin from the top of the screen and bottom of the screen and it can be Negative (-100)
          // threshold: 0.5, // This will be the percentage of the element that is visible in the viewport
        },
      );

      cards.forEach((card) => {
        observer.observe(card);
      });
    }

    // Simple counter animation for fact-num and hero-fact-num
    const animateCounter = (el) => {
  if (el.hasAttribute("data-counter-animated")) return;
  el.setAttribute("data-counter-animated", "true");

  const text = el.textContent.trim();
  const match = text.match(/([0-9]+(?:\.[0-9]+)?)/);
  if (!match) return;

  const num    = parseFloat(match[1]);
  const prefix = text.slice(0, match.index);
  const suffix = text.slice(match.index + match[1].length);

  const isMillions = suffix.includes("M");
  const isPercent  = suffix.includes("%");

  const duration  = isMillions ? 1500 : 1200;
  const steps     = isMillions ? Math.max(1, Math.round(num / 0.1)) : isPercent ? 40 : 50;
  const stepValue = num / steps;
  let i = 0;

  const interval = setInterval(() => {
    i++;
    const current = isMillions
      ? Math.min(i * 0.1, num).toFixed(1)
      : Math.floor(stepValue * i);

    el.textContent = prefix + current + suffix;

    if (i >= steps) {
      el.textContent = text; // restore original text exactly
      clearInterval(interval);
    }
  }, Math.max(10, Math.floor(duration / steps)));
};

// Observe both sections
const counterEls = document.querySelectorAll(".fact-num, .hero-fact-num");
if (counterEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -100px 0px" });

  counterEls.forEach((el) => observer.observe(el));
}

    /*--------------------------------------------------------------------------------------------------------------------------------------*/
  });

  /*All function need to define here for use strict mode
----------------------------------------------------------------------------------------------------------------------------------------*/

  /*--------------------------------------------------------------------------------------------------------------------------------------*/
})(jQuery, window, document);
