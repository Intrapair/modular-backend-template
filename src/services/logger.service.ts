import pino from 'pino';

const logger =
    process.env.NODE_ENV === 'production'
        ? pino(
              {},
              pino.transport({
                  target: '@axiomhq/pino',
                  options: {
                      dataset: process.env.AXIOM_DATASET,
                      token: process.env.AXIOM_TOKEN,
                  },
              })
          )
        : pino({ transport: { target: 'pino-pretty' } });

export default logger;
