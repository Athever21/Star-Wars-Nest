import { Injectable } from "@nestjs/common";
import * as https from "https";

@Injectable()
export class GetDataFromSwApi {
  getData(path: string) {
    return new Promise((resolve, reject) => {
      let url = `${process.env.base_sw_api}${path}${path.includes("?") ? "&format=json" : "?format=json"}`;
      const req = https.get(url);
      console.log(url);
      req.on('response', (res) => {
        let data = '';

        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(JSON.parse(data)));
        res.on('error', (err) => reject(err));
      });
      req.on('error', (err) => reject(err));
    });
  }
}
