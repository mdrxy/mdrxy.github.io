document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'c1797de6bf0b7e401b623118120cd9e1';
    const username = 'mdrxy';
    let currentTrack;
    let trackName;
    let artistName;
    let trackUrl;

    // Source: https://codepen.io/virpo/pen/YzKWWPW
    const eqAnimation = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <rect class="eq-bar eq-bar--1" x="4" y="4" width="3.7" height="8" />
                        <rect class="eq-bar eq-bar--2" x="10.2" y="4" width="3.7" height="16" />
                        <rect class="eq-bar eq-bar--3" x="16.3" y="4" width="3.7" height="11" />
                        </svg>
                        `;

    function fetchTrackInfo(trackName, artistName) {
        return fetch(`https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${artistName}&track=${trackName}&format=json`)
            .then(response => response.json())
            .then(data => {
                if (data.track && data.track.duration) {
                    return parseInt(data.track.duration, 10);
                } else {
                    return null;
                }
            })
            .catch(error => {
                console.error('Error fetching song data:', error);
                return null;
            });
    }

    function fetchNowListening() {
        return fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&limit=1&api_key=${apiKey}&format=json`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const recentTracks = data.recenttracks.track;
                if (recentTracks && recentTracks.length > 0) {
                    currentTrack = recentTracks[0];
                    trackName = currentTrack.name || 'Unknown track';
                    artistName = currentTrack.artist['#text'] || 'Unknown artist';
                    trackUrl = currentTrack.url || 'https://www.last.fm/';

                    const artistUrl = trackUrl.replace(/\/_\/[^\/]+$/, '/') || 'https://www.last.fm/';
                    const prefixText = (currentTrack['@attr'] && currentTrack['@attr'].nowplaying)
                        ? "<b>Currently Listening To:</b>"
                        : "Played Recently:";

                    const eqAnimationHTML = (prefixText === "<b>Currently Listening To:</b>") ? eqAnimation : "";
                    document.getElementById('lastfm').innerHTML = `${prefixText} <a href="${trackUrl}" target="_blank">${trackName}</a> by <a href="${artistUrl}" target="_blank">${artistName}</a> ${eqAnimationHTML}`;

                    return fetchTrackInfo(trackName, artistName);
                } else {
                    document.getElementById('lastfm').textContent = `Last.fm returned a malformed response :(`;
                    return null;
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('lastfm').textContent = `Error fetching data from Last.fm`;
                return null;
            });
    }

    function pollTrackInfo() {
        fetchNowListening().then(trackDuration => {
            let pollInterval = 30000;
            if (trackDuration && trackDuration > 0) {
                pollInterval = trackDuration;
            }

            // console.log('Polling in', pollInterval, 'ms');
            setTimeout(pollTrackInfo, pollInterval);
        });
    }

    pollTrackInfo();
});