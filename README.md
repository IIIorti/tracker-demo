## Test page for checking the tracker with Ajax and JQuery

# tracker-demo

To run the project, you first need to install PHP [link]https://www.php.net/downloads.php

The project can then be run using the command

```
    php -S localhost:8000
```

Then visit localhost:8000 in your web browser

To check the operation of the tracker, you need to configure it for this in the index.html file, in the head tag, in the snippet you need to change the programID to the one you need

```
    <script>
      !(function (e, n, a, t, o, r) {
        e.wef ||
          (((t = e.wef =
            function () {
              t.process
                ? t.process.apply(t, arguments)
                : t.queue.push(arguments);
            }).queue = []),
          (t.t = +new Date()),
          ((o = n.createElement(a)).defer = 1),
          (o.src =
            "https://revstagingstorageaccount.blob.core.windows.net/revengine-apistorage/tracker.min.js"),
          (r = n.getElementsByTagName(a)[0]).parentNode.insertBefore(o, r));
      })(window, document, "script"),
        wef("init", null, {
          programId: "YOUR PROGRAM ID HERE",
          emailLabel: "email",
          nameLabel: "name",
        }),
        wef("event", "pageload");
    </script>
```

# You also need to add a parameter with your userId to the URL.

```
http://localhost:8000/?uId=108
```

After that, watch the console in the browser, after the successful creation of the lead or view, you will be able to see a message
