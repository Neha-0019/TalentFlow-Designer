import { http, HttpResponse } from 'msw';
import { MOCK_AUTOMATIONS, buildMockSimulation } from './mocks';
import type { SimulationRequest } from '../types/workflow';

export const handlers = [
  http.get('/automations', () => HttpResponse.json(MOCK_AUTOMATIONS)),
  http.post('/simulate', async ({ request }) => {
    const body = await request.json() as SimulationRequest;
    await new Promise((r) => setTimeout(r, 600));
    return HttpResponse.json(buildMockSimulation(body));
  }),
];
