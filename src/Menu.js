import Button from './Button.js';
import { MDCMenu } from '@material/menu';

// TODO This has no effect until build process generates the HTML file
// import './Menu.scss';

export default async function* Menu() {
    for await (const { children, type='icon', icon = 'menu', label, ...buttonProps } of this) {

        let menu;

        const promise = yield (
            <div class="mdc-menu-surface--anchor">
                <Button onclick={() => menu.open = true} type={type} icon={icon} {...buttonProps}>{label}</Button>
                <div class="mdc-menu mdc-menu-surface">
                    <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
                        {children}
                    </ul>
                </div>
            </div>
        );
        const div = await promise; // in case children are async
        menu = new MDCMenu(div.children[1]); // for ripple
    }
}