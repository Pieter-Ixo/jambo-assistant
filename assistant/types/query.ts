import { createQueryClient } from '@ixo/impactxclient-sdk';

export type QueryClient = Awaited<ReturnType<typeof createQueryClient>>;
