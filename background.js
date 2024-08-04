// background.js
async function fetchContests() {
    try {
        const response = await fetch('https://codeforces.com/api/contest.list');
        const data = await response.json();

        if (data.status === 'OK') {
            chrome.storage.local.set({ contests: data.result });
        } else {
            console.error('Error:', data.comment);
        }
    } catch (error) {
        console.error('Error fetching contests:', error);
    }
}

// Fetch contests on extension installation
chrome.runtime.onInstalled.addListener(() => {
    fetchContests();
});
