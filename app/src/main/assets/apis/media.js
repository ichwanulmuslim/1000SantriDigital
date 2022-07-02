/* Copyright (c) 2012 Mobile Developer Solutions. All rights reserved.
 * This software is available under the MIT License:
 * The MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, 
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software 
 * is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies 
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE 
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, 
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// api-media
var my_media = null;
var mediaTimer = null;
var dur = -1;  // duration of media (song)
var is_paused = false; // need to know when paused or not

var audio=new Array(); 
audio[0]="/android_asset/12.mp3";       
audio[1]="/android_asset/13.mp3";
audio[2]="/android_asset/14.mp3";


function check_network() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    $('#connection').html(states[networkState]);
}
function setAudioPosition(position) {
    $("#audio_position").html(position + " sec");
}
function onSuccess() {
    setAudioPosition(dur);
    clearInterval(mediaTimer);
    mediaTimer = null;
    my_media = null;
    is_paused = false;
    dur = -1;
}
function onError(error) {
    alert('code: '    + error.code    + '\n' + 
            'message: ' + error.message + '\n');
    clearInterval(mediaTimer);
    mediaTimer = null;
    my_media = null;
    is_paused = false;
    setAudioPosition("0");
}



function playAudio9(src) {
    if (my_media === null) {       
        $("#media_dur").html("0"); // ui niceties
        $("#audio_position").html("Loading...");        
        // Create Media object from src
        my_media = new Media(src, onSuccess, onError);       
        // alert('Playing Audio');
        my_media.play();
    } else {
        if (is_paused) {
            // to resume where paused in song: call .play()
            is_paused = false;
            my_media.play();
        }
    }
    // Update my_media position every second
    if (mediaTimer === null) {
        mediaTimer = setInterval(function() {
            my_media.getCurrentPosition(
                    // success callback
                    function(position) {
                        if (position > -1) {
                            setAudioPosition(Math.round(position));
                            // getDuration() can take a few seconds so keep trying
                            // this could be done a better way, no callback for it
                            if (dur <= 0) {
                                dur = my_media.getDuration();                             
                                if (dur > 0) {
                                    dur = Math.round(dur);
                                    $("#media_dur").html(dur);
                                }
                            }                                                      
                        }
                    },
                    // error callback
                    function(e) {
                        alert("Error getting pos=" + e);
                        setAudioPosition("Error: " + e);
                    }
            );
        }, 1000);
    }}

function pauseAudio() {
    if (is_paused) { return; }
    if (my_media) {
        is_paused = true;
        my_media.pause();
    }
}
function stopAudio() {
    if (my_media) {
        // A successful .stop() will call .release()
        my_media.stop();
        my_media = null;
    }
    if (mediaTimer) {
        clearInterval(mediaTimer);
        mediaTimer = null;
    }
    is_paused = false;
    dur = 0;
}

    var rootDir         = "file:///mnt/sdcard";
    var appHomeDir      = "RawiAndroid";
    var appFullPath     = rootDir + "/" + appHomeDir;
    var demoMediaFile   = appHomeDir + "/oke.mp3"; 

    function playMedia() {
        $("#playMediaProperties").empty();
        $("#playMediaProperties").append("Playing...").trigger("create");
        
        if (! my_media) {
            my_media = new Media(demoMediaFile, null, mediaOnError);
        }

        my_media.play();
            
        if (mediaTimer == null) {
            mediaTimer = setInterval(function() {
                    my_media.getCurrentPosition(
                        function(position) {
                            if (position > -1) {
                                setAudioPosition((position) + " sec");
                            }
                        },
                        function(e) {
                            setAudioPosition("Error: " + e.message);
                        }
                    );
            }, 1000);   
        }
    }

$(document).ready(function() {       
    
    $("#diba_a").live('tap', function() {var src = appHomeDir + "/Diba/diba_a.mp3"; ; playAudio9(src); });
    $("#diba_b").live('tap', function() {var src = appHomeDir + "/Diba/diba_b.mp3"; ; playAudio9(src); });
    $("#diba_2").live('tap', function() {var src = appHomeDir + "/Diba/diba_2.mp3"; ; playAudio9(src); });
    $("#diba_3").live('tap', function() {var src = appHomeDir + "/Diba/diba_3.mp3"; ; playAudio9(src); });
    $("#diba_4").live('tap', function() {var src = appHomeDir + "/Diba/diba_4.mp3"; ; playAudio9(src); });
    $("#diba_6").live('tap', function() {var src = appHomeDir + "/Diba/diba_6.mp3"; ; playAudio9(src); });
    $("#diba_7").live('tap', function() {var src = appHomeDir + "/Diba/diba_7.mp3"; ; playAudio9(src); });
    $("#diba_8").live('tap', function() {var src = appHomeDir + "/Diba/diba_8.mp3"; ; playAudio9(src); });
    $("#diba_9").live('tap', function() {var src = appHomeDir + "/Diba/diba_9.mp3"; ; playAudio9(src); });
    $("#diba_10").live('tap', function() {var src = appHomeDir + "/Diba/diba_10.mp3"; ; playAudio9(src); });
    $("#diba_11").live('tap', function() {var src = appHomeDir + "/Diba/diba_11.mp3"; ; playAudio9(src); });
    $("#diba_14").live('tap', function() {var src = appHomeDir + "/Diba/diba_14.mp3"; ; playAudio9(src); });
    $("#diba_15").live('tap', function() {var src = appHomeDir + "/Diba/diba_15.mp3"; ; playAudio9(src); });
    $("#diba_16").live('tap', function() {var src = appHomeDir + "/Diba/diba_16.mp3"; ; playAudio9(src); });
    $("#diba_17").live('tap', function() {var src = appHomeDir + "/Diba/diba_17.mp3"; ; playAudio9(src); });
    $("#diba_18").live('tap', function() {var src = appHomeDir + "/Diba/diba_18.mp3"; ; playAudio9(src); });
    $("#diba_19").live('tap', function() {var src = appHomeDir + "/Diba/diba_19.mp3"; ; playAudio9(src); });
    $("#diba_20").live('tap', function() {var src = appHomeDir + "/Diba/diba_20.mp3"; ; playAudio9(src); });
    $("#diba_21").live('tap', function() {var src = appHomeDir + "/Diba/diba_21.mp3"; ; playAudio9(src); });
    $("#diba_22").live('tap', function() {var src = appHomeDir + "/Diba/diba_22.mp3"; ; playAudio9(src); });
    $("#diba_24").live('tap', function() {var src = appHomeDir + "/Diba/diba_24.mp3"; ; playAudio9(src); });

    $("#pauseaudio").live('tap', function() {
        pauseAudio();
    });    
    $("#stopaudio").live('tap', function() {
        stopAudio();
    });
    $("#startRecord").live('tap', function() {
        startRecord();
    });    
    $("#playbackRecord").live('tap', function() {
        //playbackRecord(); function added at recordSuccess()
    });    
});
