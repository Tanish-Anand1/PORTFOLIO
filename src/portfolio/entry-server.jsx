import { renderToString } from "react-dom/server";
import PortfolioApp from "./PortfolioApp.jsx";
export { routeList, privateRouteList, routeMeta, site } from "./content.js";
export function render(path) {
  return renderToString(<PortfolioApp path={path} />);
}
