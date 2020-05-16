import { MDCChipSet } from '@material/chips';
import displayError from './displayError';

export default async function* ChipSet() {
    try {
        for await (const props of this) {
            const { children, choice, filter } = props;
            const divClass = "mdc-chip-set" + (choice ? " mdc-chip-set--choice" : (filter ? " mdc-chip-set--filter" : ""));

            const promise = yield (
                <div class={divClass} role="grid">
                    {children}
                </div>
            );
            const div = await promise; // Chip children are async
            new MDCChipSet(div); // for ripple
        }
    } catch (error) {
        return displayError(error);
    }
}