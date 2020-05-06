import Button from './src/Button';
import { renderer } from '@bikeshaving/crank/dom';
import { Fragment } from '@bikeshaving/crank';


function* App() {
    let iconAfter;

    const onClick = () => {
        iconAfter = !iconAfter;
        this.refresh();
    }

    while (true) {
        yield (
            <Fragment>
                <div>
                    <Button icon='emoji_people' iconAfter={iconAfter} onclick={onClick}>Hello World</Button>
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
