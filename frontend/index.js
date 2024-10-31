import { backend } from "declarations/backend";

let map;
let heatmapLayer;
const loadingSpinner = document.getElementById('loading');

async function initMap() {
    map = L.map('map').setView([39.8283, -98.5795], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Configure heatmap
    const cfg = {
        "radius": 30,
        "maxOpacity": 0.8,
        "scaleRadius": false,
        "useLocalExtrema": true,
        latField: 'lat',
        lngField: 'lng',
        valueField: 'count'
    };

    heatmapLayer = new HeatmapOverlay(cfg);
    map.addLayer(heatmapLayer);

    await loadDairyFarmData();
}

async function loadDairyFarmData() {
    try {
        loadingSpinner.classList.remove('hidden');
        
        // Get data from backend
        const farmData = await backend.getDairyFarms();
        
        // Transform data for heatmap
        const heatmapData = {
            data: farmData.map(farm => ({
                lat: farm.latitude,
                lng: farm.longitude,
                count: 1
            }))
        };

        heatmapLayer.setData(heatmapData);
    } catch (error) {
        console.error('Error loading dairy farm data:', error);
        alert('Failed to load dairy farm data. Please try again later.');
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', initMap);
