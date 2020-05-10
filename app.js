import Button from './src/Button';
import IconButton from './src/IconButton';
import ToggleButton from './src/ToggleButton';
import Checkbox from './src/Checkbox';
import Chip from './src/Chip';
import ChipSet from './src/ChipSet';
import CircularProgress from './src/CircularProgress';
import Textfield from './src/Textfield';
import { renderer } from '@bikeshaving/crank/dom';
import { Fragment } from '@bikeshaving/crank';


function* App() {
    let iconAfter;
    let toggled;

    try {
        const onClick = () => {
            iconAfter = !iconAfter;
            this.refresh();
        }

        const onToggle = () => {
            toggled = !toggled;
            this.refresh();
        }

        /*
        */

        while (true) {
            yield (
                <Fragment>
                    <div>
                        <h3>Button</h3>
                        <Button type="text">Text Button</Button>
                        &nbsp;
                        <Button type="text" icon='emoji_people'>Text Button</Button>
                        <p></p>
                        <Button type="outlined">Outlined Button</Button>
                        &nbsp;
                        <Button type="outlined" icon='emoji_people'>Outlined Button</Button>
                        <p></p>
                        <Button type="unelevated">Unelevated Button</Button>
                        &nbsp;
                        <Button type="unelevated" icon='emoji_people'>Unelevated Button</Button>
                        <p></p>
                        <Button type="raised">Raised Button</Button>
                        &nbsp;
                        <Button type="raised" icon='emoji_people'>Raised Button</Button>
                        <p></p>
                        <Button type="raised" icon='emoji_people' iconAfter={iconAfter} onclick={onClick}>Click Me</Button>
                    </div>
                    <div>
                        <h3>Icon Button</h3>
                        <IconButton icon="emoji_people" />
                        <IconButton disabled={true} icon="emoji_people" />
                    </div>
                    <div>
                        <h3>Toggle Button</h3>
                        <ToggleButton icon="favorite" toggledIcon="favorite_border" onclick={onToggle} toggled={toggled} />
                        <ToggleButton disabled={true} icon="favorite" toggledIcon="favorite_border" toggled={toggled} />
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
                        <CircularProgress size="small" progress={0}></CircularProgress>
                        <CircularProgress size="medium" progress={0.33}></CircularProgress>
                        <CircularProgress size="large" indeterminate={true} animateColor={true}></CircularProgress>
                    </div>
                    <div>
                        <h3>Textfield</h3>
                        <Textfield type="filled" label="First Name"></Textfield>
                        &nbsp;
                        <Textfield type="filled"></Textfield>
                        <p></p>
                        <Textfield type="outlined" label="Last Name"></Textfield>
                        &nbsp;
                        <Textfield type="outlined"></Textfield>
                        <p></p>
                        <Textfield type="full-width" label="Address"></Textfield>
                        &nbsp;
                        <Textfield type="full-width"></Textfield>
                        <p></p>
                        <Textfield type="textarea" label="Description"></Textfield>
                        &nbsp;
                        <Textfield type="textarea"></Textfield>
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
