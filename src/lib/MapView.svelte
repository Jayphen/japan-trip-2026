<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { itinerary, type DayPlan, type Coordinates } from "./itinerary";
	import type L from "leaflet";

	let mapContainer: HTMLDivElement;
	let map: L.Map | null = null;

	// Get unique locations for markers (avoid duplicates for same hotel stays)
	function getUniqueLocations(): Array<{ coordinates: Coordinates; days: DayPlan[] }> {
		const locationMap = new Map<string, { coordinates: Coordinates; days: DayPlan[] }>();
		
		Object.values(itinerary).forEach(function(day) {
			const key = `${day.coordinates.lat},${day.coordinates.lng}`;
			if (locationMap.has(key)) {
				locationMap.get(key)!.days.push(day);
			} else {
				locationMap.set(key, { coordinates: day.coordinates, days: [day] });
			}
		});
		
		return Array.from(locationMap.values());
	}

	// Get journey path in order
	function getJourneyPath(): Coordinates[] {
		const days = Object.values(itinerary).sort(function(a, b) {
			return a.dayNumber - b.dayNumber;
		});
		
		const path: Coordinates[] = [];
		let lastCoord: string | null = null;
		
		days.forEach(function(day) {
			const coordKey = `${day.coordinates.lat},${day.coordinates.lng}`;
			if (coordKey !== lastCoord) {
				path.push(day.coordinates);
				lastCoord = coordKey;
			}
		});
		
		return path;
	}

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric",
		});
	}

	onMount(async function() {
		// Dynamic import for SSR safety
		const L = await import("leaflet");
		
		// Import Leaflet CSS
		await import("leaflet/dist/leaflet.css");
		
		// Initialize map centered on Japan
		map = L.map(mapContainer, {
			zoomControl: true,
			scrollWheelZoom: true,
		}).setView([36.0, 137.0], 6);

		// Add CartoDB Voyager tiles (English labels)
		L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
			subdomains: "abcd",
			maxZoom: 20,
		}).addTo(map);

		// Custom marker icon (sakura pink theme)
		const markerIcon = L.divIcon({
			className: "custom-marker",
			html: `<div class="w-8 h-8 bg-rose-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
				<div class="w-3 h-3 bg-white rounded-full"></div>
			</div>`,
			iconSize: [32, 32],
			iconAnchor: [16, 16],
			popupAnchor: [0, -16],
		});

		// Add markers for each unique location
		const locations = getUniqueLocations();
		locations.forEach(function(location) {
			const { coordinates, days } = location;
			const firstDay = days[0];
			const lastDay = days[days.length - 1];
			
			// Create popup content
			const dayRange = days.length > 1 
				? `Days ${firstDay.dayNumber}-${lastDay.dayNumber}` 
				: `Day ${firstDay.dayNumber}`;
			
			const dateRange = days.length > 1
				? `${formatDate(firstDay.date)} - ${formatDate(lastDay.date)}`
				: formatDate(firstDay.date);
			
			const activities = days.map(function(d) { return d.mainActivity; });
			const uniqueActivities = [...new Set(activities)].join(", ");
			
			const popupContent = `
				<div class="p-2 min-w-48">
					<div class="font-bold text-rose-900 text-lg mb-1">${firstDay.region}</div>
					<div class="text-sm text-gray-600 mb-2">${dayRange} • ${dateRange}</div>
					<div class="text-sm font-medium text-gray-800 mb-2">${firstDay.hotel}</div>
					<div class="text-xs text-gray-600">${uniqueActivities}</div>
				</div>
			`;
			
			L.marker([coordinates.lat, coordinates.lng], { icon: markerIcon })
				.addTo(map!)
				.bindPopup(popupContent, {
					className: "custom-popup",
					maxWidth: 300,
				});
		});

		// Draw journey polyline
		const journeyPath = getJourneyPath();
		const latLngs = journeyPath.map(function(coord) {
			return [coord.lat, coord.lng] as [number, number];
		});
		
		L.polyline(latLngs, {
			color: "#f43f5e", // rose-500
			weight: 3,
			opacity: 0.7,
			dashArray: "10, 10",
		}).addTo(map);

		// Fit bounds to show all markers
		const bounds = L.latLngBounds(latLngs);
		map.fitBounds(bounds, { padding: [50, 50] });
	});

	onDestroy(function() {
		if (map) {
			map.remove();
			map = null;
		}
	});
</script>

<div bind:this={mapContainer} class="w-full h-full"></div>

<style>
	:global(.custom-marker) {
		background: transparent !important;
		border: none !important;
	}
	
	:global(.custom-popup .leaflet-popup-content-wrapper) {
		border-radius: 12px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
	}
	
	:global(.custom-popup .leaflet-popup-tip) {
		background: white;
	}
	
	:global(.leaflet-container) {
		font-family: inherit;
	}
</style>
