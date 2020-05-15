import { Fragment } from '@bikeshaving/crank';
import TopAppBar from './TopAppBar';
import Drawer from './Drawer';
import displayError from './displayError';

export default async function* App() {
    for await (const { children } of this) {

        // NOTE: Children is not an array if only one child!

        const topAppBar = children[0];
        if (!topAppBar instanceof TopAppBar) {
            return <p>Error: First child of App must be TopAppBar.</p>
        }

        const drawer = children[1];
        if (!drawer instanceof Drawer) {
            return <p>Error: Second child of App must be Drawer or undefined.</p>
        }

        const main = children[2];
        if (!main) {
            return <p>Error: Third child of App must be application content.</p>
        }

        try {
            const p = yield (
                <Fragment>
                    {drawer}
                    <div class="mdc-drawer-app-content">
                        {topAppBar}
                        <main id="main" class="main-content" id="main-content">
                            {main}
                        </main>
                    </div>
                </Fragment>
            );
        } catch (error) {
            return displayError(error);
        }
    }
}
