import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { MikroORM, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
  console.log('tris dep zai');
  
});

const start = async() => {
  try {
    const orm = await MikroORM.init<PostgreSqlDriver>({
      entities: [],
      dbName: 'trisdepzai',
      type: 'postgresql',
      clientUrl : process.env.DATABASE_URL,
    });
    app.use((req, res, next) => {
      RequestContext.create(orm.em, next);
    });
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    });
  } catch (error) {
    console.log(error)
  }
}
start();