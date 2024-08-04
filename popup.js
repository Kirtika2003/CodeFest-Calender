document.addEventListener('DOMContentLoaded', function() {
  const contestsList = document.getElementById('contests-list'); // Define it here
  const toggleHackathons = document.getElementById('toggle-hackathons');
  const toggleContests = document.getElementById('toggle-contests');

  function fetchHackathons() {
    fetch('http://localhost:3000/proxy/hackathons')
      .then(response => response.json())
      .then(data => {
        contestsList.innerHTML = ''; // Clear previous content
        data.hackathons.forEach(event => {
          const eventElement = document.createElement('div');
          eventElement.className = 'contest';
          eventElement.innerHTML = `
            <a href="${event.url}" target="_blank">
              <h2>${event.title}</h2>
              <p>Submission Period: ${event['submission_period_dates']}</p>
              <p>Time left for submission: ${event['time_left_to_submission']}</p>
            </a>
          `;
          contestsList.appendChild(eventElement);
        });
      })
      .catch(error => console.error('Error fetching Devpost events:', error));
  }

  function fetchContests() {
    fetch('https://codeforces.com/api/contest.list?gym=false')
      .then(response => response.json())
      .then(data => {
        contestsList.innerHTML = ''; // Clear previous content
        const upcomingContests = data.result.filter(contest => contest.phase === 'BEFORE');
        upcomingContests.slice(0, 5).forEach(contest => {
          const contestElement = document.createElement('div');
          contestElement.className = 'contest';
          contestElement.innerHTML = `
            <h2>${contest.name}</h2>
            <p>Start Time: ${new Date(contest.startTimeSeconds * 1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</p>
            <p>End Time: ${new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000).toLocaleString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'})}</p>
            <p><a href="https://codeforces.com/contests/${contest.id}" target="_blank">View Contest</a></p>
          `;
          contestsList.appendChild(contestElement);
        });
      })
      .catch(error => console.error('Error fetching contests:', error));
  }

  toggleHackathons.addEventListener('click', fetchHackathons);
  toggleContests.addEventListener('click', fetchContests);

  // Default view
  // fetchContests();
});
