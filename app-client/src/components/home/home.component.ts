import template from './home.component.html';
import style from './home.component.scss';

export class HomeComponent {
  render(): string {
    return `<style>${style}</style>${template}`;
  }
  onInit?(): void;
  afterRender?(): void;
  constructor(){}
  afterRenderImpl() {
    // legacy, not used
  }
  afterRender() {
    const btn = document.getElementById('call');
    btn?.addEventListener('click', async () => {
      const res = await fetch('/api/hello');
      const json = await res.json();
      (document.getElementById('out') as HTMLElement).innerText = JSON.stringify(json, null, 2);
    });
  }
}
