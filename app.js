import Button from './src/Button';
import ToggleButton from './src/ToggleButton';
import RadioButton from './src/RadioButton';
import Switch from './src/Switch';
import Checkbox from './src/Checkbox';
import Chip from './src/Chip';
import ChipSet from './src/ChipSet';
import CircularProgress from './src/CircularProgress';
import Textfield from './src/Textfield';
import Menu from './src/Menu';
import MenuDivider from './src/MenuDivider';
import MenuItem from './src/MenuItem';
import { renderer } from '@bikeshaving/crank/dom';
import { Fragment } from '@bikeshaving/crank';
import wrap from './src/wrap';
import App from './src/App';
import TopAppBar from './src/TopAppBar';
import displayError from './src/displayError';
import Drawer from './src/Drawer';
import DrawerItem from './src/DrawerItem';
import DrawerDivider from './src/DrawerDivider';

function* Main() {

    try {
        for (const { uiData: hiddenUIData } of this) {

            const uiData = wrap(hiddenUIData, () => this.refresh());

            const onClick = () => {
                uiData.iconAfter = !uiData.iconAfter;
            }

            const onToggle = () => {
                uiData.toggled = !uiData.toggled;
            }

            const onRadio = (r) => {
                uiData.radio = r;
            }

            const drawer = (
                <Drawer modal={uiData.toggled} title="Drawer Title" subtitle="Drawer subtitle">
                    <DrawerItem label="One" icon="settings" onclick={() => console.log('drawer item clicked')} />
                    <DrawerItem label="Two" />
                    <DrawerDivider />
                    <DrawerItem label="three" icon="settings" />
                </Drawer>
            );

            const appBarType = "normal";

            const topAppBar = (
                <TopAppBar nav={!!drawer} title="Crank-Material SwAK" type={appBarType} >
                    <Button type="icon" icon="search"></Button>
                    <Button type="icon" icon="backup"></Button>
                    <Button type="icon" icon="settings"></Button>
                    <Menu icon="more_vert">
                        <MenuItem icon="check">One</MenuItem>
                        <MenuItem>Two</MenuItem>
                        <MenuItem>Three</MenuItem>
                        <MenuItem>Four</MenuItem>
                    </Menu>
                </TopAppBar>
            );

            yield (
                <App type={appBarType} drawer={drawer} topAppBar={topAppBar}>
                    <div>
                        <p class="mdc-typography--body1">A Swiss army knife of Material Design components implemented using Crank.js.</p>
                    </div>
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
                        <Button type="raised" icon='emoji_people' iconAfter={uiData.iconAfter} onclick={onClick}>Click Me</Button>
                    </div>
                    <div>
                        <h3>Icon Button</h3>
                        <Button type="icon" icon="emoji_people" />
                        <Button type="icon" disabled={true} icon="emoji_people" />
                    </div>
                    <div>
                        <h3>Toggle Button</h3>
                        <ToggleButton icon="favorite" toggledIcon="favorite_border" onclick={onToggle} toggled={uiData.toggled} />
                        <ToggleButton disabled={true} icon="favorite" toggledIcon="favorite_border" toggled={uiData.toggled} />
                    </div>
                    <div>
                        <h3>Checkbox</h3>
                        <Checkbox crank-key="1" checked={true}></Checkbox>
                        <Checkbox crank-key="2" checked={true} disabled={true}></Checkbox>
                        <p></p>
                        <Checkbox crank-key="3" ></Checkbox>
                        <Checkbox crank-key="4" disabled={true}></Checkbox>
                        <p></p>
                        <Checkbox crank-key="5" indeterminate={true}></Checkbox>
                        <Checkbox crank-key="6" disabled={true} indeterminate={true}></Checkbox>
                    </div>
                    <div>
                        <h3>RadioButton</h3>
                        <RadioButton checked={uiData.radio === 0} onclick={() => onRadio(0)} />
                        <RadioButton checked={uiData.radio === 1} onclick={() => onRadio(1)} />
                        <RadioButton checked={uiData.radio === 2} onclick={() => onRadio(2)} />
                        <RadioButton checked={uiData.radio === 3} onclick={() => onRadio(3)} />
                        <RadioButton checked={uiData.radio === 4} onclick={() => onRadio(4)} />
                        <RadioButton disabled={true} />
                        <RadioButton checked={true} disabled={true} />
                    </div>
                    <div>
                        <h3>Switch</h3>
                        <Switch />
                        <p></p>
                        <Switch checked={true} />
                        <p></p>
                        <Switch disabled={true} />
                        <p></p>
                        <Switch checked={true} disabled={true} />
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
                        <h3>Menu</h3>
                        <Menu>
                            <MenuItem onclick={() => uiData.menuData.menuClickCount++}>Menu Item</MenuItem>
                            <MenuDivider />
                            <MenuItem icon="check_box_outline_blank">One</MenuItem>
                            <MenuItem icon="check_box">Two</MenuItem>
                            <MenuItem icon="check_box_outline_blank">Three</MenuItem>
                            <MenuDivider />
                            <MenuItem icon="radio_button_unchecked">Four</MenuItem>
                            <MenuItem icon="radio_button_unchecked">Five</MenuItem>
                            <MenuItem icon="radio_button_checked">Six</MenuItem>
                            <MenuDivider />
                            <MenuItem disabled={true}>Disabled</MenuItem>
                        </Menu>
                        <Menu type='text' icon="" label="My Menu">
                            <MenuItem onclick={() => uiData.menuData.menuClickCount++}>Menu Item</MenuItem>
                        </Menu>
                        <Menu type="outlined" icon="settings" label="Settings">
                            <MenuItem onclick={() => uiData.menuData.menuClickCount++}>Menu Item</MenuItem>
                        </Menu>
                        <p>Menu item clicked {uiData.menuData.menuClickCount} times.</p>
                    </div>
                    <div>
                        <h3>Top App Bar</h3>
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
                </App>
            )
        }
    } catch (error) {
        return displayError(error);
    }
}

const uiData = {
    iconAfter: false,
    toggled: false,
    radio: 0,
    menuOpen: false,
    menuData: {
        menuClickCount: 0
    }
}

const main = <Main uiData={uiData} />;

renderer.render(main, document.body);

if (module.hot) {
    module.hot.accept();
}
