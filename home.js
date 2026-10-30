(function () {
  'use strict';
  const list = document.getElementById('show-list');
  const notice = document.getElementById('shows-announcement');
  if (!list) return;

  function showDate(show) {
    if (show.dateLabel) return show.dateLabel;
    if (!show.date) return '';
    return new Date(show.date + 'T12:00:00Z').toLocaleDateString('en-US', {
      timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  function render(shows, announcement) {
    list.replaceChildren();
    if (notice) {
      notice.textContent = announcement || '';
      notice.hidden = !announcement;
    }
    if (!shows.length) {
      const message = document.createElement('p');
      message.textContent = 'New show dates will be posted here soon.';
      list.appendChild(message);
      return;
    }

    const sorted = [...shows].sort((a,b) =>
      String(a.date || '').localeCompare(String(b.date || '')) ||
      String(a.start || '').localeCompare(String(b.start || '')));

    sorted.forEach((show) => {
      const card = document.createElement('article');
      card.className = 'show-card';
      if (show.photo) {
        const img = document.createElement('img');
        img.src = show.photo;
        img.alt = show.alt || (show.project || 'Sierra Green') + ' performance photo';
        img.loading = 'lazy';
        img.style.cssText = 'width:100%;max-height:190px;object-fit:cover;border-radius:10px;margin-bottom:12px';
        card.appendChild(img);
      }
      const date = document.createElement('p');
      date.className = 'show-date';
      date.textContent = showDate(show);
      const project = document.createElement('h3');
      project.textContent = show.project;
      const venue = document.createElement('p');
      venue.className = 'show-venue';
      venue.textContent = [show.venue, show.location].filter(Boolean).join(' · ');
      const time = document.createElement('p');
      time.className = 'show-time';
      time.textContent = show.time;
      card.append(date,project,venue,time);
      list.appendChild(card);
    });
  }

  async function boot() {
    try {
      const response = await fetch('./shows.json?calendar=' + Date.now(), {cache:'no-store'});
      if (!response.ok) throw Error('Calendar HTTP '+response.status);
      const data = await response.json();
      if (!Array.isArray(data.shows)) throw Error('Unrecognized calendar format.');
      render(data.shows,data.announcement || '');
    } catch (error) {
      console.warn('Using the preserved Sierra shows-data.js fallback.',error);
      render(Array.isArray(window.SIERRA_SHOWS)?window.SIERRA_SHOWS:[],'');
    }
  }
  boot();
})();
