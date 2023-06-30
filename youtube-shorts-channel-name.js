// ==UserScript==
// @name         Youtube Shorts channel name
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add Channel name to Youtube shorts
// @author       You
// @match        https://www.youtube.com/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_xmlhttpRequest
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js
// @license MIT
// ==/UserScript==

(function() {
    'use strict';

    let videos;
    let intervalId = setInterval(function(){
        videos = document.querySelectorAll(".ytd-rich-grid-slim-media #thumbnail");
        if(videos.length > 0) {
            clearInterval(intervalId); // clear interval if videos.length > 0
        }
        for(let video of videos){
            makeRequest(video);
        }
    }, 1000);

    function makeRequest(video) {
        let href = video.getAttribute("href");
        var ancestor = $(video).closest("#content");
        var descendant = ancestor.find(".inline-metadata-item");
        const youtubeURL = "https://www.youtube.com" + href;

        GM_xmlhttpRequest({
            method: 'GET',
            url: youtubeURL,
            onload: function(response) {
                var data = response.responseText;
                var match = data.match(/\/@([^"]*)/);
                if (match && match[1]) {
                    var result = match[1];
                    descendant.after(`<div style="padding-left:10px">${result}</div>`);
                } else {
                    console.log("Pattern not found in the response data.");
                }
            }
        });
    }
})();
