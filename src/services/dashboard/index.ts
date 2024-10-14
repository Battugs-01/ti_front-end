import http from "..";
import { MapDataType, TotalCaseInterface, TotalPointInterface } from "./type";
namespace dashboard {
  export const points = (body: any) =>
    http.get<TotalPointInterface[]>("dashboard/points", {
      hasAuth: true,
      body,
    });
  export const totalCase = (body: any) =>
    http.get<TotalCaseInterface>("dashboard/total_cases", {
      hasAuth: true,
      body,
    });
  export const mapData = () =>
    http.get<MapDataType[]>("dashboard/map", {
      hasAuth: true,
    });
}

export default dashboard;
