// Custom API handler types that don't rely on Next.js
export type ApiHandler = (req: Request, res: Response) => Promise<void>;

export type Response = {
  status: (code: number) => Response;
  json: (data: Record<string, unknown>) => void;
  setHeader: (name: string, value: string) => void;
};

export function createServerHandler(handler: ApiHandler) {
  return async function(req: Request, res: Response) {
    try {
      return await handler(req, res);
    } catch (error) {
      console.error('API error:', error);
      return res.status(500).json({ 
        error: 'Internal Server Error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      });
    }
  };
}
