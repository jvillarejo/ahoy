/*jslint browser: true, indent: 2, plusplus: true, vars: true */

(function (window) {
  "use strict";

  var debugMode = false;
  var visitTtl, visitorTtl;
  var $ = window.jQuery || window.Zepto || window.$;
  var visitToken, visitorToken;

  if (debugMode) {
    visitTtl = 0.2;
    visitorTtl = 5; // 5 minutes
  } else {
    visitTtl = 4 * 60; // 4 hours
    visitorTtl = 2 * 365 * 24 * 60; // 2 years
  }

  // cookies

  // http://www.quirksmode.org/js/cookies.html
  function setCookie(name, value, ttl) {
    var expires = "";
    if (ttl) {
      var date = new Date();
      date.setTime(date.getTime() + (ttl * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function getCookie(name) {
    var i, c;
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (i = 0; i < ca.length; i++) {
      c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  // ids

  // http://stackoverflow.com/a/2117523/1177228
  function generateToken() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  function debug(message) {
    if (debugMode) {
      window.console.log(message, visitToken, visitorToken);
    }
  }

  // main

  visitToken = getCookie("ahoy_visit");
  visitorToken = getCookie("ahoy_visitor");

  if (visitToken && visitorToken) {
    // TODO keep visit alive?
    debug("Active visit");
  } else {
    if (!visitorToken) {
      visitorToken = generateToken();
      setCookie("ahoy_visitor", visitorToken, visitorTtl);
    }

    // always generate a new visit id here
    visitToken = generateToken();
    setCookie("ahoy_visit", visitToken, visitTtl);

    // make sure cookies are enabled
    if (getCookie("ahoy_visit")) {
      debug("Visit started");

      var data = {
        visit_token: visitToken,
        visitor_token: visitorToken,
        landing_page: window.location.href
      };

      // referrer
      if (document.referrer.length > 0) {
        data.referrer = document.referrer;
      }

      debug(data);

      $.post("/ahoy/visits", data);
    } else {
      debug("Cookies disabled");
    }
  }

}(window));
