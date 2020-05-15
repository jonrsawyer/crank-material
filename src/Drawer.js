import { MDCDrawer } from '@material/drawer';
import displayError from './displayError';

// TODO This has no effect until build process generates the HTML file
// import './Menu.scss';

export default async function* Drawer() {
    try {
        for await (const { children } of this) {

            const p = yield (
                <aside class="mdc-drawer mdc-drawer--dismissible">
                    <div class="mdc-drawer__content">
                        {children}
                    </div>
                </aside>
            );
            const aside = await p; // in case children are async
        }
    } catch (error) {
        return displayError(error);
    }
}
