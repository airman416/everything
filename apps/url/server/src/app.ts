import express from 'express';
import cors from 'cors';
/**
 * * Stateful dependencies to inject at root.
 */
type MainDependencies = {
  shortenUrl: (original: string) => Promise<string>;
  lookupUrl: (shortId: number) => Promise<string>;
  getUrlVisitCount: (shortId: number) => Promise<number>;
};

export async function createApp({ shortenUrl, lookupUrl, getUrlVisitCount }: MainDependencies) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.post('/api/shorten', async (req, res) => {
    const original = req.body.original;
    const short = await shortenUrl(original);

    res.status(201).send({
      short: short,
      original: original,
    });
  });

  app.get('/s/:id', async (req, res) => {
    const id = Number(req.params.id);
    const original = await lookupUrl(id);
    res.redirect(original);
  });

  app.get('/s/c/:id', async (req, res) => {
    const id = Number(req.params.id);
    const count = await getUrlVisitCount(id);
    res.send(count);
  })

  return app;
}