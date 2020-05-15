import { MDCList } from '@material/list';
import displayError from './displayError';

// TODO This has no effect until build process generates the HTML file
// import './Menu.scss';

export default async function* List() {
    try {
        for await (const { children } of this) {

            // Children is not an array if only one child!

            // First item only should have tabindex set
            if (children[0]) {
                children[0].props.tabindex = "0";
            }
            for (let i = 1; i < children.length; i++) {
                if (children[i]) {
                    delete children[i].props.tabindex;
                }
            }

            const p = yield (
                <ul class="mdc-list">
                    {children}
                </ul>
            );
            const ul = await p; // in case children are async
            const list = new MDCList(ul); // for ripple
            //list.wrapFocus = true; // Only for permanently visible drawer
        }
    } catch (error) {
        return displayError(error);
    }
}
