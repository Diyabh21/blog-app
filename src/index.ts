import express, { Application, NextFunction, Request, Response } from 'express'; 
import router from './routes/main.route'; 
import mongoose from 'mongoose'; 

class App {
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
    this.app.get("/", (req: Request, res: Response, next:NextFunction) => {
      return res.send({
        status:200, /** HTTP status code for successful request */
        data:'You are connected to blog server!' /** Response message */
      });
    });
    /** Use the main router for handling routes starting with '/' */
    this.app.use('/', router); 
  }
/** Log the port the server is running on */
  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on port ${port}`); 
    });
  }
}
/** Creating an instance of the App class */
const server = new App(); 
/** Defining the port, defaulting to 3000 if not specified in environment variables */
const PORT = Number(process.env.PORT) || 3000; 
/** Starting the server */
server.start(PORT); 
