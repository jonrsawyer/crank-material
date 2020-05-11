import Button from './src/Button';
import IconButton from './src/IconButton';
import ToggleButton from './src/ToggleButton';
import RadioButton from './src/RadioButton';
import Switch from './src/Switch';
import Checkbox from './src/Checkbox';
import Chip from './src/Chip';
import ChipSet from './src/ChipSet';
import CircularProgress from './src/CircularProgress';
import Textfield from './src/Textfield';
import Menu from './src/Menu';
import MenuAnchor from './src/MenuAnchor';
import MenuDivider from './src/MenuDivider';
import MenuItem from './src/MenuItem';
import { renderer } from '@bikeshaving/crank/dom';
import { Fragment } from '@bikeshaving/crank';


function* App() {
    let iconAfter;
    let toggled;
    let radio = 0;
    let menuOpen;

    const self = this;

    const menuData = {
        menuClickCount: 0
    }

    const menuDataProxy = new Proxy([menuData], {
        get: function (proxyTarget, propertyKey) {
            const foundParent = proxyTarget.find(parent => parent[propertyKey] !== undefined);
            return foundParent && foundParent[propertyKey];
        },

        set: function (proxyTarget, propertyKey, value) {
            const foundParent = proxyTarget.find(parent => parent[propertyKey] !== undefined);
            if (foundParent && foundParent[propertyKey] !== value) {
                foundParent[propertyKey] = value;
                self.refresh();
            }
            return true; // Proxy contract
        }
    });

    try {
        const onClick = () => {
            iconAfter = !iconAfter;
            this.refresh();
        }

        const onToggle = () => {
            toggled = !toggled;
            this.refresh();
        }

        const onRadio = (r) => {
            radio = r;
            this.refresh();
        }

        const openMenu = () => {
            menuOpen = true;
            this.refresh();
            menuOpen = false; // need to reset this so other calls to refresh don't pop up the menu
        }

        // Inlined this
        // const menuItemClicked = () => {
        //     menuDataProxy.menuClickCount++;
        // }

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
                        <p></p>
                        <Checkbox crank-key="3" ></Checkbox>
                        <Checkbox crank-key="4" disabled={true}></Checkbox>
                        <p></p>
                        <Checkbox crank-key="5" indeterminate={true}></Checkbox>
                        <Checkbox crank-key="6" disabled={true} indeterminate={true}></Checkbox>
                    </div>
                    <div>
                        <h3>RadioButton</h3>
                        <RadioButton checked={radio === 0} onclick={() => onRadio(0)} />
                        <RadioButton checked={radio === 1} onclick={() => onRadio(1)} />
                        <RadioButton checked={radio === 2} onclick={() => onRadio(2)} />
                        <RadioButton checked={radio === 3} onclick={() => onRadio(3)} />
                        <RadioButton checked={radio === 4} onclick={() => onRadio(4)} />
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
                        <MenuAnchor>
                            <Button onclick={openMenu}>Menu</Button>
                            <Menu open={menuOpen}>
                                <MenuItem onclick={() => menuDataProxy.menuClickCount++}>Menu Item</MenuItem>
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
                        </MenuAnchor>
                        <p>Menu item clicked {menuDataProxy.menuClickCount} times.</p>
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
