import Button from './src/Button';
import Checkbox from './src/Checkbox';
import { renderer } from '@bikeshaving/crank/dom';
import { Fragment } from '@bikeshaving/crank';


function* App() {
    let iconAfter;

    const onClick = () => {
        iconAfter = !iconAfter;
        this.refresh();
    }

    //<Checkbox checked={true} disabled={true}></Checkbox>
    //<Checkbox indeterminate={true}></Checkbox>

    while (true) {
        yield (
            <Fragment>
                <div>
                    <Button icon='emoji_people' iconAfter={iconAfter} onclick={onClick}>Hello World</Button>
                </div>
                <div>
                <Checkbox checked={true}></Checkbox>
                
                
                </div>
            </Fragment>
        )
    }
}

// TODO This should be in a separate file...
const content = <App />;
const root = document.getElementById('root');
renderer.render(content, root);

if (module.hot) {
    module.hot.accept();
}
