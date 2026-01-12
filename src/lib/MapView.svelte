<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import { itinerary, type DayPlan, type Coordinates, type Activity } from "./itinerary";
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

	// Get activities with coordinates (points of interest)
	function getActivityLocations(): Array<{ activity: Activity; day: DayPlan; coordinates: Coordinates }> {
		const activities: Array<{ activity: Activity; day: DayPlan; coordinates: Coordinates }> = [];
		
		Object.values(itinerary).forEach(function(day) {
			if (day.activities) {
				day.activities.forEach(function(activity) {
					if (activity.coordinates) {
						// Skip if coordinates match the day's main coordinates (hotel)
						const isDifferentLocation = 
							activity.coordinates.lat !== day.coordinates.lat || 
							activity.coordinates.lng !== day.coordinates.lng;
						if (isDifferentLocation) {
							activities.push({ activity, day, coordinates: activity.coordinates });
						}
					}
				});
			}
		});
		
		return activities;
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

		// Custom marker icon for hotels (sakura pink theme)
		const hotelIcon = L.divIcon({
			className: "custom-marker",
			html: `<div class="w-8 h-8 bg-rose-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center">
				<div class="w-3 h-3 bg-white rounded-full"></div>
			</div>`,
			iconSize: [32, 32],
			iconAnchor: [16, 16],
			popupAnchor: [0, -16],
		});

		// Custom marker icon for activities/POIs (amber theme, smaller)
		const activityIcon = L.divIcon({
			className: "custom-marker",
			html: `<div class="w-6 h-6 bg-amber-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
				<div class="w-2 h-2 bg-white rounded-full"></div>
			</div>`,
			iconSize: [24, 24],
			iconAnchor: [12, 12],
			popupAnchor: [0, -12],
		});

		// Add markers for each unique hotel location
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
					<div class="text-sm font-medium text-gray-800 mb-2">🏨 ${firstDay.hotel}</div>
					<div class="text-xs text-gray-600">${uniqueActivities}</div>
				</div>
			`;
			
			L.marker([coordinates.lat, coordinates.lng], { icon: hotelIcon })
				.addTo(map!)
				.bindPopup(popupContent, {
					className: "custom-popup",
					maxWidth: 300,
				});
		});

		// Add markers for activities with specific locations
		const activityLocations = getActivityLocations();
		activityLocations.forEach(function(item) {
			const { activity, day, coordinates } = item;
			
			const popupContent = `
				<div class="p-2 min-w-48">
					<div class="font-bold text-amber-800 text-lg mb-1">${activity.name}</div>
					<div class="text-sm text-gray-600 mb-2">Day ${day.dayNumber} • ${formatDate(day.date)}</div>
					${activity.description ? `<div class="text-sm text-gray-700 mb-2">${activity.description}</div>` : ''}
					${activity.tip ? `<div class="text-xs text-amber-700 bg-amber-50 p-2 rounded">💡 ${activity.tip}</div>` : ''}
				</div>
			`;
			
			L.marker([coordinates.lat, coordinates.lng], { icon: activityIcon })
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

		// Fit bounds to show all markers (including activities)
		const allLatLngs = [...latLngs];
		activityLocations.forEach(function(item) {
			allLatLngs.push([item.coordinates.lat, item.coordinates.lng]);
		});
		const bounds = L.latLngBounds(allLatLngs);
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
