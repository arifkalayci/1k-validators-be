import Koa from 'koa';

import Database from './db';

const API: any = {
  GetValidators: '/validators',
  GetNodes: '/nodes',
  GetNominators: '/nominators',
  GetRounds: '/rounds',
};

export default class Server {
  public app: Koa;
  private db: Database;

  constructor(db: Database, port: number) {
    this.app = new Koa();
    this.db = db;

    this.app.use(async (ctx: any) => {
      switch (ctx.url.toLowerCase()) {
        case API.GetValidators:
          {
            const allValidators = await this.db.allValidators();
            // ctx.body = allValidators.join('\n');
          }
          break;
        case API.GetNodes:
          {
            const allNodes: Array<any> = await this.db.allNodes();
            ctx.body = allNodes.map((node: any) => JSON.stringify(node)).join('\n');
          }
          break;
        case API.GetNominators:
          {
            const allNominators = await this.db.allNominators();
            // ctx.body = allNominators.join('\n');
          }
          break;
        case API.GetRounds:
          {
            // TODO
          }
          break;
        default:
          ctx.body = 'Invalid api endpoint.'
      }
    });

    console.log(`Now listening on ${port}`);
    this.app.listen(port);
  }
}