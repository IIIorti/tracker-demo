// Open Pixel v1.2.0 | MIT License
(function (
  window,
  document,
  pixelFunc,
  pixelFuncName,
  pixelEndpoint,
  versionNumber
) {
  "use strict";

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly)
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source)
        );
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key)
          );
        });
      }
    }
    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };
    }
    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var Config = {
    id: "",
    params: {},
    version: versionNumber,
    host: "https://rev-engine-api-staging.azurewebsites.net",
    inputs: {
      emailLabel: "",
      nameLabel: "",
      companyLabel: "",
    },
  };

  var Helper = /*#__PURE__*/ (function () {
    function Helper() {
      _classCallCheck(this, Helper);
    }

    _createClass(Helper, null, [
      {
        key: "isPresent",
        value: function isPresent(variable) {
          return (
            typeof variable !== "undefined" &&
            variable !== null &&
            variable !== ""
          );
        },
      },
      {
        key: "now",
        value: function now() {
          return 1 * new Date();
        },
      },
      {
        key: "guid",
        value: function guid() {
          return (
            Config.version +
            "-xxxxxxxx-".replace(/[x]/g, function (c) {
              var r = (Math.random() * 36) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
              return v.toString(36);
            }) +
            (1 * new Date()).toString(36)
          );
        },
      },
      {
        key: "gRef",
        value: function gRef() {
          var refCode = "ref";
          var val = "";

          if (Helper.isPresent(Url.getParameterByName(refCode))) {
            val = Url.getParameterByName(refCode);
          }

          return val;
        },
      },
      {
        key: "isBot",
        value: function isBot(userAgent) {
          return /bot|crawler|spider|crawling/i.test(userAgent);
        }, // reduces all optional data down to a string
      },
      {
        key: "optionalData",
        value: function optionalData(data) {
          if (Helper.isPresent(data) === false) {
            return "";
          } else if (_typeof(data) === "object") {
            // runs Helper.optionalData again to reduce to string in case something else was returned
            return Helper.optionalData(JSON.stringify(data));
          } else if (typeof data === "function") {
            // runs the function and calls Helper.optionalData again to reduce further if it isn't a string
            return Helper.optionalData(data());
          } else {
            return String(data);
          }
        },
      },
      {
        key: "sendLead",
        value: function sendLead(data) {
          var message = "";

          if (this.isBot(Browser.userAgent()) === false) {
            var init = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            };
            fetch(
              "".concat(Config.host, "/api/services/app/Leads/CreateOrEdit"),
              init
            )
              .then(function (resp) {
                return resp.json();
              })
              .then(function (data) {
                message = "event successfully sent";
                console.log("Create Lead request sent");
                return message;
              });
          } else {
            message = "this is bot";
            return message;
          }
        },
      },
      {
        key: "sendView",
        value: function sendView(data) {
          var message = "";

          if (this.isBot(Browser.userAgent()) === false) {
            var init = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            };
            fetch(
              "".concat(Config.host, "/api/services/app/ProgramViews/Create"),
              init
            )
              .then(function (resp) {
                return resp.json();
              })
              .then(function (data) {
                message = "event successfully sent";
                console.log("Program view request sent");
                return message;
              });
          } else {
            message = "this is bot";
            return message;
          }
        },
      },
    ]);

    return Helper;
  })();

  var Browser = /*#__PURE__*/ (function () {
    function Browser() {
      _classCallCheck(this, Browser);
    }

    _createClass(Browser, null, [
      {
        key: "nameAndVersion",
        value: function nameAndVersion() {
          // http://stackoverflow.com/questions/5916900/how-can-you-detect-the-version-of-a-browser
          var ua = navigator.userAgent,
            tem,
            M =
              ua.match(
                /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
              ) || [];

          if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return "IE " + (tem[1] || "");
          }

          if (M[1] === "Chrome") {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null)
              return tem.slice(1).join(" ").replace("OPR", "Opera");
          }

          M = M[2]
            ? [M[1], M[2]]
            : [navigator.appName, navigator.appVersion, "-?"];
          if ((tem = ua.match(/version\/(\d+)/i)) != null)
            M.splice(1, 1, tem[1]);
          return M.join(" ");
        },
      },
      {
        key: "isMobile",
        value: function isMobile() {
          return "ontouchstart" in document;
        },
      },
      {
        key: "userAgent",
        value: function userAgent() {
          return window.navigator.userAgent;
        },
      },
    ]);

    return Browser;
  })();

  var Cookie = /*#__PURE__*/ (function () {
    function Cookie() {
      _classCallCheck(this, Cookie);
    }

    _createClass(Cookie, null, [
      {
        key: "prefix",
        value: function prefix() {
          return "__".concat(pixelFuncName, "_");
        },
      },
      {
        key: "set",
        value: function set(name, value, minutes) {
          var path =
            arguments.length > 3 && arguments[3] !== undefined
              ? arguments[3]
              : "/";
          var expires = "";

          if (Helper.isPresent(minutes)) {
            var date = new Date();
            date.setTime(date.getTime() + minutes * 60 * 1000);
            expires = "expires=".concat(date.toGMTString(), "; ");
          }

          document.cookie = ""
            .concat(this.prefix())
            .concat(name, "=")
            .concat(value, "; ")
            .concat(expires, "path=")
            .concat(path, "; SameSite=Lax");
        },
      },
      {
        key: "get",
        value: function get(name) {
          var name = "".concat(this.prefix()).concat(name, "=");
          var ca = document.cookie.split(";");

          for (var i = 0; i < ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) == " ") {
              c = c.substring(1);
            }

            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
          }

          return;
        },
      },
      {
        key: "delete",
        value: function _delete(name) {
          this.set(name, "", -100);
        },
      },
      {
        key: "exists",
        value: function exists(name) {
          return Helper.isPresent(this.get(name));
        },
      },
    ]);

    return Cookie;
  })();

  var Url = /*#__PURE__*/ (function () {
    function Url() {
      _classCallCheck(this, Url);
    }

    _createClass(Url, null, [
      {
        key: "getParameterByName",
        // http://stackoverflow.com/a/901144/1231563
        value: function getParameterByName(name, url) {
          if (!url) url = window.location.href;
          name = name.replace(/[\[\]]/g, "\\$&");
          var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
            results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return "";
          return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
      },
      {
        key: "externalHost",
        value: function externalHost(link) {
          return (
            link.hostname != location.hostname &&
            link.protocol.indexOf("http") === 0
          );
        },
      },
    ]);

    return Url;
  })();

  var Pixel = /*#__PURE__*/ (function () {
    function Pixel(event, timestamp, optional) {
      _classCallCheck(this, Pixel);

      this.params = [];
      this.event = event;
      this.timestamp = timestamp;
      this.optional = Helper.optionalData(optional);
      this.buildParams();
      this.send();
    }

    _createClass(Pixel, [
      {
        key: "buildParams",
        value: function buildParams() {
          var attr = this.getAttribute();

          for (var index in attr) {
            if (attr.hasOwnProperty(index)) {
              this.setParam(index, attr[index](index));
            }
          }
        },
      },
      {
        key: "getAttribute",
        value: function getAttribute() {
          var _this = this;

          return _objectSpread(
            {
              id: function id() {
                return Config.id;
              },
              // website Id
              ref: function ref() {
                return Cookie.get("ref");
              },
              // referral code
              ev: function ev() {
                return _this.event;
              },
              // event being triggered
              ed: function ed() {
                return _this.optional;
              },
              // any event data to pass along
              v: function v() {
                return Config.version;
              },
              // tracker.js version
              dl: function dl() {
                return window.location.href;
              },
              // document location
              rl: function rl() {
                return document.referrer;
              },
              // referrer location
              ts: function ts() {
                return _this.timestamp;
              },
              // timestamp when event was triggered
              de: function de() {
                return document.characterSet;
              },
              // document encoding
              sr: function sr() {
                return window.screen.width + "x" + window.screen.height;
              },
              // screen resolution
              vp: function vp() {
                return window.innerWidth + "x" + window.innerHeight;
              },
              // viewport size
              cd: function cd() {
                return window.screen.colorDepth;
              },
              // color depth
              dt: function dt() {
                return document.title;
              },
              // document title
              bn: function bn() {
                return Browser.nameAndVersion();
              },
              // browser name and version number
              md: function md() {
                return Browser.isMobile();
              },
              // is a mobile device?
              ua: function ua() {
                return Browser.userAgent();
              },
              // user agent
              tz: function tz() {
                return new Date().getTimezoneOffset();
              },
            },
            Config.params
          );
        },
      },
      {
        key: "setParam",
        value: function setParam(key, val) {
          if (Helper.isPresent(val)) {
            this.params.push(
              "".concat(key, "=").concat(encodeURIComponent(val))
            );
          } else {
            this.params.push("".concat(key, "="));
          }
        },
      },
      {
        key: "send",
        value: function send() {
          window.navigator.sendBeacon ? this.sendBeacon() : this.sendImage();
        },
      },
      {
        key: "sendBeacon",
        value: function sendBeacon() {
          window.navigator.sendBeacon(this.getSourceUrl());
        },
      },
      {
        key: "sendImage",
        value: function sendImage() {
          this.img = document.createElement("img");
          this.img.src = this.getSourceUrl();
          this.img.style.display = "none";
          this.img.width = "1";
          this.img.height = "1";
          document.getElementsByTagName("body")[0].appendChild(this.img);
        },
      },
      {
        key: "getSourceUrl",
        value: function getSourceUrl() {
          return "".concat(pixelEndpoint, "?").concat(this.params.join("&"));
        },
      },
    ]);

    return Pixel;
  })(); // process the queue and future incoming commands

  var userId = null,
    programId = null,
    form = undefined,
    referralId = undefined,
    referralEmail = undefined; // emailInput = undefined,
  // nameInputs = [];

  pixelFunc.process = function (method, value, optional) {
    if (method === "init") {
      getReferralParams();
      programId =
        (optional === null || optional === void 0
          ? void 0
          : optional.programId) || "";
      Config.inputs.nameLabel =
        (optional === null || optional === void 0
          ? void 0
          : optional.nameLabel) || "";
      Config.inputs.emailLabel =
        (optional === null || optional === void 0
          ? void 0
          : optional.emailLabel) || "";
    } else if (method === "param") {
      Config.params[value] = function () {
        return optional;
      };
    } else if (method === "event") {
      if (value === "createLead") {
        registerLead(optional);
      }
    }
  };

  function getReferralParams() {
    var urlParams = new Proxy(new URLSearchParams(window.location.search), {
      get: function get(searchParams, prop) {
        return searchParams.get(prop);
      },
    });
    userId = urlParams.uId;
    referralId = Cookie.get("referralId");
    referralEmail = Cookie.get("referralEmail");

    if (!!userId) {
      Cookie.set("referralId", userId, 1500);
    }
  } // run the queued calls from the snippet to be processed

  for (var i = 0, l = pixelFunc.queue.length; i < l; i++) {
    pixelFunc.process.apply(pixelFunc, pixelFunc.queue[i]);
  }

  function registerLead(leadData) {
    if (!!userId || !!referralId) {
      if (leadData.name && leadData.email) {
        Helper.sendLead({
          name: leadData.name,
          email: leadData.email,
          programId: programId,
          userId: userId || referralId,
        });
      } else {
        console.error("Please, provide valid lead name and lead email!");
      }
    }
  } // function removeInputs() {
  //   emailInput = undefined;
  //   nameInputs = [];
  // }
  // const removeEventListener = () => {
  //   if (form) {
  //     form.removeEventListener("submit", onFormSubmitEvent);
  //   }
  // };
  // function validateInput(label, placeholder, key) {
  //   const regex = new RegExp(`\\b${key}\\b`);
  //   return (
  //     regex.test(label?.toLowerCase()) || regex.test(placeholder?.toLowerCase())
  //   );
  // }
  // const findInputs = () => {
  //   const inputs = document.getElementsByTagName("input");
  //   if (inputs.length > 0) {
  //     for (let i = 0; i < inputs.length; i++) {
  //       if (
  //         validateInput(
  //           inputs[i].labels[0]?.textContent,
  //           inputs[i].placeholder,
  //           Config.inputs.nameLabel.toLowerCase()
  //         )
  //       ) {
  //         nameInputs.push(inputs[i]);
  //       }
  //       if (
  //         validateInput(
  //           inputs[i].labels[0]?.textContent,
  //           inputs[i].placeholder,
  //           Config.inputs.emailLabel.toLowerCase()
  //         )
  //       ) {
  //         emailInput = inputs[i];
  //       }
  //       form = inputs[i].form;
  //     }
  //     if (form) {
  //       form.addEventListener("submit", onFormSubmitEvent);
  //     }
  //   }
  // };
  // function onFormSubmitEvent() {
  //   if (!emailInput || nameInputs.length === 0) return;
  //   let userData = {
  //     name: "",
  //     email: emailInput.value,
  //     programId,
  //   };
  //   if (nameInputs.length === 1) {
  //     userData.name = nameInputs[0].value;
  //   }
  //   if (nameInputs.length === 2) {
  //     if (
  //       (validateInput(
  //         nameInputs[0].labels[0]?.textContent,
  //         nameInputs[0].placeholder,
  //         "first name"
  //       ) &&
  //         validateInput(
  //           nameInputs[1].labels[0]?.textContent,
  //           nameInputs[1].placeholder,
  //           "last name"
  //         )) ||
  //       (validateInput(
  //         nameInputs[0].labels[0]?.textContent,
  //         nameInputs[0].placeholder,
  //         "last name"
  //       ) &&
  //         validateInput(
  //           nameInputs[1].labels[0]?.textContent,
  //           nameInputs[1].placeholder,
  //           "first name"
  //         ))
  //     ) {
  //       userData.name = `${nameInputs[0].value} ${nameInputs[1].value}`;
  //     }
  //   }
  //   if (nameInputs.length > 2) {
  //     userData.name = nameInputs[0].value;
  //   }
  //   if (!userData.name && !userData.email) return;
  //   if (userId && !referralId && !referralEmail) {
  //     userData.userId = userId;
  //     setTimeout(() => {
  //       Helper.sendLead(userData);
  //     }, 0);
  //     Cookie.set("referralEmail", userData.email, 1500);
  //     removeInputs();
  //     return;
  //   }
  //   if (userId && referralId && !referralEmail) {
  //     userData.userId = userId;
  //     setTimeout(() => {
  //       Helper.sendLead(userData);
  //     }, 0);
  //     Cookie.set("referralId", userId, 1500);
  //     Cookie.set("referralEmail", userData.email, 1500);
  //     removeInputs();
  //     return;
  //   }
  //   if (!userId && referralId && !referralEmail) {
  //     userData.userId = referralId;
  //     setTimeout(() => {
  //       Helper.sendLead(userData);
  //     }, 0);
  //     Cookie.set("referralEmail", userData.email, 1500);
  //     referralEmail = userData.email;
  //     removeInputs();
  //     return;
  //   }
  //   if (userId && referralId && referralEmail) {
  //     userData.userId = userId;
  //     setTimeout(() => {
  //       Helper.sendLead(userData);
  //     }, 0);
  //     Cookie.set("referralEmail", userData.email, 1500);
  //     removeInputs();
  //     return;
  //   }
  // }

  var countViews = function countViews() {
    // setTimeout(() => {
    //   removeEventListener();
    //   findInputs();
    // }, 500);
    if (!!userId || !!referralId) {
      setTimeout(function () {
        var _userId;

        Helper.sendView({
          programId: programId,
          userId:
            (_userId = userId) !== null && _userId !== void 0
              ? _userId
              : referralId,
        });
      }, 0);
    }
  };

  window.addEventListener("load", function () {
    countViews();
  });

  if (window.navigation) {
    window.navigation.addEventListener("navigate", function (event) {
      countViews();
    });
  } else {
    var url = window.location.href;
    document.body.addEventListener(
      "click",
      function () {
        requestAnimationFrame(function () {
          if (url !== window.location.href) {
            countViews();
            url = window.location.href;
          }
        });
      },
      true
    );
  }

  window.addEventListener("popstate", function () {
    countViews();
  });
})(window, document, window["wef"], "wef", "/pixel.gif", 1);
