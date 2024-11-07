function getVersion() {
    const params = new URLSearchParams(window.location.search);
    return params.get('version') || '1';
}

function convertTemp(temp, version) {
    return version === '1' ? temp : Math.round(temp * 9/5 + 32);
}

async function fetchWeather() {
    const version = getVersion();
    const response = await fetch(`http://localhost:30001/weather`, {
        headers: {
            'x-version': version
        }
    });
    const data = await response.json();
    
    const unit = version === '1' ? '°C' : '°F';
    const html = `
        <table>
            <tr><th>Day</th><th>Temperature</th><th>Condition</th></tr>
            ${data.map(day => `
                <tr>
                    <td>${day.day}</td>
                    <td>${convertTemp(day.temp, version)}${unit}</td>
                    <td>${day.condition}</td>
                </tr>
            `).join('')}
        </table>
    `;
    
    document.getElementById('forecast').innerHTML = html;
}

window.onload = fetchWeather;