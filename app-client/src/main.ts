import { AureonRouter } from './router';
import { HomeComponent } from './components/home/home.component';

const root = document.getElementById('app') || document.body;
const router = new AureonRouter([
  { path: '/', component: HomeComponent }
]);
router.mount(root as HTMLElement);
