document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'c1797de6bf0b7e401b623118120cd9e1';
    const username = 'mdrxy';
    const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&limit=1&api_key=${apiKey}&format=json`;

    function fetchNowListening() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const recentTracks = data.recenttracks.track;
                if (recentTracks && recentTracks.length > 0) {
                    const currentTrack = recentTracks[0];
                    const trackName = currentTrack.name || 'Unknown track';
                    const artistName = currentTrack.artist['#text'] || 'Unknown artist';
                    const trackUrl = currentTrack.url || 'https://www.last.fm/';

                    // Get the artist URL by removing the track part of the URL
                    const artistUrl = trackUrl.replace(/\/_\/[^\/]+$/, '/') || 'https://www.last.fm/';
                    const prefixText = (currentTrack['@attr'] && currentTrack['@attr'].nowplaying)
                        ? "Currently Listening To:"
                        : "Played Recently:";

                    document.getElementById('lastfm').innerHTML = `${prefixText} <a href="${trackUrl}" target="_blank">${trackName}</a> by <a href="${artistUrl}" target="_blank">${artistName}</a>`;
                } else {
                    document.getElementById('lastfm').textContent = `Last.fm returned a malformed response :(`;
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('lastfm').textContent = `Error fetching data from Last.fm`;
            });
    }

    fetchNowListening();

    // Poll every 30 seconds
    setInterval(fetchNowListening, 30000);
});