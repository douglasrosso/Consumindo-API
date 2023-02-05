export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);

    this.handle();
  }

  handle() {
    const { pathname } = window.location;
    // desestruturado
    // const pathname = window.location.pathname;
    // ou para mais de 1
    // const { pathname, href, host, port } = window.location;

    const route = this.routes[pathname] || this.routes[404];
    // pegue no routes o pathname, se não tiver pegue o 404

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      });
  }
}
