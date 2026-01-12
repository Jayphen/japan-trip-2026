<script lang="ts">
	import { onMount, onDestroy } from "svelte";
	import type { DayPlan, Coordinates } from "./itinerary";
	import type L from "leaflet";

	interface Props {
		dayPlan: DayPlan;
	}

	let { dayPlan }: Props = $props();
	let mapContainer: HTMLDivElement;
	let map: L.Map | null = null;

	// Get all locations for this day (hotel + activities with coordinates)
	function getDayLocations(): Array<{ name: string; coordinates: Coordinates; isHotel: boolean; description?: string }> {
		const locations: Array<{ name: string; coordinates: Coordinates; isHotel: boolean; description?: string }> = [];
		
		// Add hotel location
		locations.push({
			name: dayPlan.hotel,
			coordinates: dayPlan.coordinates,
			isHotel: true
		});
		
		// Add activity locations
		if (dayPlan.activities) {
			dayPlan.activities.forEach(function(activity) {
				if (activity.coordinates) {
					// Only add if different from hotel
					const isDifferent = 
						activity.coordinates.lat !== dayPlan.coordinates.lat || 
						activity.coordinates.lng !== dayPlan.coordinates.lng;
					if (isDifferent) {
						locations.push({
							name: activity.name,
							coordinates: activity.coordinates,
							isHotel: false,
							description: activity.description
						});
					}
				}
			});
		}
		
		return locations;
	}

	async function initMap() {
		if (!mapContainer) return;
		
		// Dynamic import for SSR safety
		const L = await import("leaflet");
		await import("leaflet/dist/leaflet.css");
		
		const locations = getDayLocations();
		
		// Initialize map
		map = L.map(mapContainer, {
			zoomControl: false,
			scrollWheelZoom: false,
			dragging: true,
		});

		// Add CartoDB Voyager tiles (English labels)
		L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
			attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>',
			subdomains: "abcd",
			maxZoom: 18,
		}).addTo(map);

		// Hotel marker icon (pink)
		const hotelIcon = L.divIcon({
			className: "custom-marker",
			html: `<div class="w-7 h-7 bg-rose-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
				<svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
					<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
				</svg>
			</div>`,
			iconSize: [28, 28],
			iconAnchor: [14, 14],
			popupAnchor: [0, -14],
		});

		// Activity marker icon (amber)
		const activityIcon = L.divIcon({
			className: "custom-marker",
			html: `<div class="w-6 h-6 bg-amber-500 rounded-full border-2 border-white shadow-md flex items-center justify-center">
				<svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
				</svg>
			</div>`,
			iconSize: [24, 24],
			iconAnchor: [12, 12],
			popupAnchor: [0, -12],
		});

		// Add markers
		const latLngs: [number, number][] = [];
		locations.forEach(function(loc) {
			const icon = loc.isHotel ? hotelIcon : activityIcon;
			const popupContent = loc.isHotel 
				? `<div class="font-semibold text-rose-900">🏨 ${loc.name}</div>`
				: `<div class="font-semibold text-amber-800">${loc.name}</div>${loc.description ? `<div class="text-xs text-gray-600 mt-1">${loc.description}</div>` : ''}`;
			
			L.marker([loc.coordinates.lat, loc.coordinates.lng], { icon })
				.addTo(map!)
				.bindPopup(popupContent, { className: "custom-popup", maxWidth: 200 });
			
			latLngs.push([loc.coordinates.lat, loc.coordinates.lng]);
		});

		// Draw line between locations if more than one
		if (latLngs.length > 1) {
			L.polyline(latLngs, {
				color: "#f59e0b", // amber-500
				weight: 2,
				opacity: 0.6,
				dashArray: "6, 6",
			}).addTo(map);
		}

		// Fit bounds or center on single location
		if (latLngs.length > 1) {
			const bounds = L.latLngBounds(latLngs);
			map.fitBounds(bounds, { padding: [30, 30] });
		} else {
			map.setView(latLngs[0], 14);
		}
	}

	onMount(function() {
		initMap();
	});

	onDestroy(function() {
		if (map) {
			map.remove();
			map = null;
		}
	});

	// Reinitialize map when dayPlan changes
	$effect(() => {
		dayPlan; // Track dependency
		if (map) {
			map.remove();
			map = null;
		}
		initMap();
	});
</script>

<div class="rounded-xl overflow-hidden shadow-md border border-rose-200">
	<div bind:this={mapContainer} class="w-full h-48"></div>
	<a 
		href="/map" 
		class="block bg-white/90 text-center py-2 text-sm text-rose-700 hover:bg-rose-50 transition-colors font-medium"
	>
		View Full Trip Map →
	</a>
</div>

<style>
	:global(.custom-marker) {
		background: transparent !important;
		border: none !important;
	}
	
	:global(.custom-popup .leaflet-popup-content-wrapper) {
		border-radius: 8px;
		padding: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	}
	
	:global(.custom-popup .leaflet-popup-content) {
		margin: 8px 10px;
	}
	
	:global(.custom-popup .leaflet-popup-tip) {
		background: white;
	}
</style>
