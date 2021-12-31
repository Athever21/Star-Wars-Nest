import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

export class DataInterceptor implements NestInterceptor {
  private changeUrl(url) {
    if (typeof url !== "string" || !url.startsWith("https://")) return url;

    const urlArr = url.split("/").splice(4);

    return `${process.env.base_url}/${urlArr.join("/")}`;
  }

  private changeResource(resource: any) {
    for (const [key, value] of Object.entries(resource)) {
      if (Array.isArray(value)) {
        resource[key] = value.map((x) => this.changeUrl(x));
      } else {
        resource[key] = this.changeUrl(value);
      }
    }

    return resource;
  }

  intercept(context: ExecutionContext, next: CallHandler) : Observable<any> {
    return next.handle().pipe(map((data) => {
      if (data.data.results) {
        data.data = this.changeResource(data.data);
        data.data.results = data.data.results.map((x) => this.changeResource(x));
      } else {
        data.data = this.changeResource(data.data);
      }

      return data;
    }))
  }
}