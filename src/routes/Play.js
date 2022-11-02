import * as React from 'react'

/**
 * Export Play route and redirect to play.html for tetris gameplay with play.js
 * @returns JSX.Element
 */
export default function Play() {
  return(
    <head>
      <meta httpEquiv='refresh' content='0; url=play.html'/>
    </head>
  )
}
    /* <meta httpEquiv='refresh' content='0; url={process.env.PUBLIC_URL + "play.html"}'/> */
    // <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

    // <body onload="window.location = 'http://example.com/'">

    // <?php
    //   header("Location: http://example.com", true, 302);
    //   exit;
    // ?>
    // <script type="text/javascript">
    //   window.location.href = "http://example.com"
    // </script>

    // <script>
    //   setTimeout(function(){location.href="http://example.com/alternate_url.html"} , 3000);
    // </script>

    // <script type="text/javascript">
    //   window.location.assign("http://www.example.com")
    // </script>

    // <link rel="canonical" href="https://stackoverflow.com/"/>
    // <noscript>
    //   <meta http-equiv="refresh" content="0; URL=https://stackoverflow.com/">
    // </noscript>
    // <!--[if lt IE 9]><script type="text/javascript">var IE_fix=true;</script><![endif]-->
    // <script type="text/javascript">
    //   var url = "https://stackoverflow.com/";
    //   if(typeof IE_fix != "undefined") // IE8 and lower fix to pass the http referer
    //     {
    //       document.write("redirecting..."); // Don't remove this line or appendChild() will fail because it is called before document.onload to make the redirect as fast as possible. Nobody will see this text, it is only a tech fix.
    //       var referLink = document.createElement("a");
    //       referLink.href = url;
    //       document.body.appendChild(referLink);
    //       referLink.click();
    //     }
    //     else { window.location.replace(url); } // All other browsers
    // </script>

    // <html>
    //   <head>
    //     <title>Example</title>
    //     <script>
    //       function init()
    //       {
    //           window.location.href = "www.wherever.com";
    //       }
    //     </script>
    //   </head>

    //   <body onload="init()">
    //   </body>
    // </html>
