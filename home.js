(function () {
  const showList = document.getElementById('show-list');
  if (!showList || !Array.isArray(window.SIERRA_SHOWS)) return;

  window.SIERRA_SHOWS.forEach((show) => {
    const card = document.createElement('article');
    card.className = 'show-card';

    const date = document.createElement('p');
    date.className = 'show-date';
    date.textContent = show.dateLabel;

    const project = document.createElement('h3');
    project.textContent = show.project;

    const venue = document.createElement('p');
    venue.className = 'show-venue';
    venue.textContent = `${show.venue} · ${show.location}`;

    const time = document.createElement('p');
    time.className = 'show-time';
    time.textContent = show.time;

    card.append(date, project, venue, time);
    showList.appendChild(card);
  });
})();
