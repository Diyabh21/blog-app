import express, { Application, NextFunction, Request, Response } from 'express';
import router from './routes/main.route';
import mongoose from 'mongoose';

class BackendServer {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.dbConnection();
    this.routes(); 
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }
  
  private async dbConnection(){
    
    try {
      const MONGODB_URI = 'mongodb+srv://diyabhaumick:diyalocal@atlascluster.gjdtljc.mongodb.net/';
      mongoose.connect(MONGODB_URI, {
        dbName: 'blogs'
      });
      console.log('Connected to database');
    }
    catch(e){
      console.log('Error faced while connecting to database');
    }
  }

  private routes(): void { 
    this.app.get("/", (req: Request, res: Response, next:NextFunction)=>{
      return res.send({
        status:200,
        data:'You are connected to blog server!'
      });
    });
    this.app.use('/', router); 
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

const server = new BackendServer();
const PORT = Number(process.env.PORT) || 3000;
server.start(PORT);
