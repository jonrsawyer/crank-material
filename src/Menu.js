import Button from './Button.js';
import { MDCMenu } from '@material/menu';
import displayError from './displayError';

import './Menu.scss';

export default async function* Menu() {
    try {
        for await (const { children, type = 'icon', icon = 'menu', label, classes, ...buttonProps } of this) {

            let menu;

            const p = yield (
                <div class="mdc-menu-surface--anchor">
                    <Button onclick={() => menu.open = true} type={type} icon={icon} classes={classes} {...buttonProps}>{label}</Button>
                    <div class="mdc-menu mdc-menu-surface">
                        <ul class="mdc-list" role="menu" aria-hidden="true" aria-orientation="vertical" tabindex="-1">
                            {children}
                        </ul>
                    </div>
                </div>
            );
            const div = await p; // in case children are async
            menu = new MDCMenu(div.children[1]); // for ripple
        }
    } catch (error) {
        return displayError(error);
    }
}
