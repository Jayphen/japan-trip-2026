import { error } from '@sveltejs/kit';
import { itinerary } from '$lib/itinerary';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
  const date = params.date;
  const dayPlan = itinerary[date];

  if (!dayPlan) {
    throw error(404, `No itinerary found for ${date}`);
  }

  return { date, dayPlan };
};
