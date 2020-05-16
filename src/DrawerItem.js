import displayError from './displayError.js';

export default function* DrawerItem() {
    try {
        for (const { label, icon, onclick, activated } of this) {

            const aClass = "mdc-list-item" + (activated ? " mdc-list-item--activated" : "");
            yield (
                <a class={aClass} href="#" aria-current="page" tabindex="0" onclick={() => onclick && onclick()}>
                    <i class="material-icons mdc-list-item__graphic" aria-hidden="true">{icon}</i>
                    <span class="mdc-list-item__text">{label}</span>
                </a>
            );
        }
    } catch (error) {
        return displayError(error);
    }
}