export default async function* MenuItem() {
    for await (const { disabled, children, icon, onclick } of this) {

        const iconTag = icon && (
            <span class="mdc-list-item__graphic mdc-menu__selection-group-icon">
                <i class="material-icons" aria-hidden="true">{icon}</i>
            </span>
        );

        const divClass = "mdc-list-item" + (disabled ? ' mdc-list-item--disabled' : '');
        const promise = yield (
            <li class={divClass} role="menuitem" onclick={onclick}>
                {iconTag}
                <span class="mdc-list-item__text">{children}</span>
            </li>
        );
    }
}