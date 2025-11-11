// js/spotify.js

// Authorization token (tem de ser atualizado periodicamente)
const token = 'BQCCPkf0iEty7X7X2rzemlkjgUhM-M9aRVuR4k4Ve2UxB7ycIzOL982Byt6yzFWLyn4YWrkubbTa9RMHmQimmcEIK7bhawvoHM7IW0wsSGdzXUQhXTfBhB6YIgv75HA9nKH4DK1ZCCxqxLohaOk42lAW3X7aaqSo0GoCP1kb31qEt_SrUgxeUUFFff2NuUuwv2Y8hWXNiojt5Nl4VgUNcxYYH_kUOPuMEl2bIzWziPeCNfCo1KEFYo76OlOzYHMbM21VMaAjSU-s9LLdtJN7zTEwK9EynxWzND0mWDtQs_k4ep8sAHv8djipUTcQEVYT5WPU';

async function fetchWebApi(endpoint, method = 'GET', body = null) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method,
    body: body ? JSON.stringify(body) : null
  });
  return await res.json();
}

async function getTopTracks() {
  const data = await fetchWebApi('v1/me/top/tracks?time_range=long_term&limit=5');
  return data.items || [];
}

function renderTopTracks(tracks) {
  const container = document.getElementById('track-container');
  container.innerHTML = '';

  if (!tracks.length) {
    container.innerHTML = '<p>Não foram encontradas músicas.</p>';
    return;
  }

  tracks.forEach(track => {
    const trackEl = document.createElement('div');
    trackEl.className = 'track';
    trackEl.textContent = `${track.name} by ${track.artists.map(a => a.name).join(', ')}`;
    container.appendChild(trackEl);
  });
}

// Inicialização
(async () => {
  try {
    const topTracks = await getTopTracks();
    renderTopTracks(topTracks);
    console.log(topTracks?.map(({name, artists}) => `${name} by ${artists.map(a => a.name).join(', ')}`));
  } catch (err) {
    console.error('Erro a carregar músicas do Spotify:', err);
    document.getElementById('track-container').innerHTML = '<p>Erro a carregar músicas.</p>';
  }
})();
