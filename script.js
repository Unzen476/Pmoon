document.getElementById('search-bar').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting traditionally
    const query = document.getElementById('searchInput').value;

    // Fetch results from the server
    fetch(`/search?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Clear previous results

            data.results.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.textContent = item.name; // Assuming each item has a 'name' property
                resultsDiv.appendChild(resultItem);
            });
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
});

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Sample data to search from
const data = [
    { name: 'Limbus Company' },
    { name: 'Banana' },
    { name: 'Cherry' },
    { name: 'Date' },
    { name: 'Elderberry' }
];

app.get('/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const results = data.filter(item => item.name.toLowerCase().includes(query));
    res.json({ results });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});