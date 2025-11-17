export class AureonRouter {
  private routes: { path: string, component: any }[];
  constructor(routes: { path: string, component: any }[]) {
    this.routes = routes;
  }
  mount(root: HTMLElement) {
    this.navigate(window.location.pathname, root);
    window.addEventListener('popstate', () => this.navigate(window.location.pathname, root));
    document.addEventListener('click', (e) => {
      const a = (e.target as HTMLElement).closest && (e.target as HTMLElement).closest('[routerLink]') as HTMLElement|null;
      if (a) {
        e.preventDefault();
        const href = a.getAttribute('routerLink') || '/';
        history.pushState({}, '', href);
        this.navigate(href, root);
      }
    });
  }
  navigate(path: string, root: HTMLElement) {
    const route = this.routes.find(r => r.path === path) || this.routes[0];
    const comp = route.component;
    const instance = new comp();
    if (instance.onInit) instance.onInit();
    root.innerHTML = instance.render();
    if (instance.afterRender) instance.afterRender();
  }
}
