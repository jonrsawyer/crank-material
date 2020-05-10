export default async function* MenuAnchor() {
    for await (const { children } of this) {

        const promise = yield (
            <div class="mdc-menu-surface--anchor">
                {children}
            </div>
        );
    }
}