import displayError from "./displayError";

export default async function* MenuItem() {
    try {
        for await (const { disabled, children, icon, onclick } of this) {

            const divClass = "mdc-list-item" + (disabled ? ' mdc-list-item--disabled' : '');
            const promise = yield (
                <li class={divClass} role="menuitem" onclick={onclick}>
                    <span class="mdc-list-item__graphic mdc-menu__selection-group-icon">
                        <i class="material-icons" aria-hidden="true">{icon}</i>
                    </span>
                    <span class="mdc-list-item__text">{children}</span>
                </li>
            );
        }
    } catch (error) {
        return displayError(error);
    }
}