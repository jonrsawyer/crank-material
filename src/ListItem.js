import displayError from "./displayError";

export default async function* ListItem() {
    try {
        for await (const { children } of this) {

            const p = yield (
                <li class="mdc-list-item" tabindex="0">
                    <span class="mdc-list-item__text">{children}</span>
                </li>
            );
        }
    } catch (error) {
        return displayError(error);
    }
}
