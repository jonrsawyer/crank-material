import { MDCMenu } from '@material/menu';

// TODO This has no effect until build process generates the HTML file
// import './Menu.scss';

export default async function* Menu() {
    for await (const { children, open } of this) {

        const promise = yield (
            <div class="mdc-menu mdc-menu-surface">
                <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
                    {children}
                </ul>
            </div>
        );
        const div = await promise; // in case children are async
        const menu = new MDCMenu(div); // for ripple
        menu.open = open;
    }
}