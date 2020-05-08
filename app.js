import Button from './src/Button';
import Checkbox from './src/Checkbox';
import Chip from './src/Chip';
import ChipSet from './src/ChipSet';
import CircularProgress from './src/CircularProgress';
import { renderer } from '@bikeshaving/crank/dom';
import { Fragment } from '@bikeshaving/crank';


function* App() {
    let iconAfter;

    try {
        const onClick = () => {
            iconAfter = !iconAfter;
            this.refresh();
        }

        /*
                        <CircularProgress size="small" progress={0}></CircularProgress>
                        <CircularProgress size="medium" progress={0.33}></CircularProgress>
        */

        while (true) {
            yield (
                <Fragment>
                    <div>
                        <h3>Button</h3>
                        <Button icon='emoji_people' iconAfter={iconAfter} onclick={onClick}>Hello World</Button>
                    </div>
                    <div>
                        <h3>Checkbox</h3>
                        <Checkbox crank-key="1" checked={true}></Checkbox>
                        <Checkbox crank-key="2" checked={true} disabled={true}></Checkbox>
                        <Checkbox crank-key="3" indeterminate={true}></Checkbox>
                    </div>
                    <div>
                        <h3>Chips</h3>
                        <Chip leadingIcon="settings">Standalone chip</Chip>
                        <ChipSet>
                            <Chip crank-key="one" leadingIcon="home" selected={true}>One</Chip>
                            <Chip crank-key="two" leadingIcon="favorite" >Two</Chip>
                        </ChipSet>
                        <ChipSet choice={true}>
                            <Chip crank-key="choice one" leadingIcon="view_headline" selected={true}>Choice One</Chip>
                            <Chip crank-key="choice two" leadingIcon="view_list">Choice Two</Chip>
                        </ChipSet>
                        <ChipSet filter={true}>
                            <Chip crank-key="filter one" leadingIcon="filter_1" selected={true}>Filter One</Chip>
                            <Chip crank-key="filter two" leadingIcon="filter_2">Filter Two</Chip>
                        </ChipSet>
                        <ChipSet>
                            <Chip crank-key="input one" input={true} cancel={true}>Apple</Chip>
                            <Chip crank-key="input two" input={true} cancel={true}>Orange</Chip>
                        </ChipSet>
                    </div>
                    <div>
                        <h3>Circular Progress</h3>
                        <CircularProgress size="large" indeterminate={true} animateColor={true}></CircularProgress>
                    </div>
                </Fragment>
            )
        }
    } catch (error) {
        return (
            <div>
                <h4>Error</h4>
                {error.message}
                <pre>
                    {error.stack}
                </pre>
            </div>
        );
    }
}

// TODO This should be in a separate file...
const content = <App />;
const root = document.getElementById('root');
renderer.render(content, root);

if (module.hot) {
    module.hot.accept();
}
