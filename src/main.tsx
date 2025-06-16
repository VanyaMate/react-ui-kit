import { createRoot } from 'react-dom/client';
import '@vanyamate/css-variables';
import { ComponentsPreview } from '@/_dev_/ComponentsPreview/ComponentsPreview';


const app = document.getElementById('app');
if (app) {
    createRoot(app).render(
        <ComponentsPreview/>,
    );
}