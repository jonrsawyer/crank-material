const merge = require('webpack-merge');
const common = require('./webpack.common.cjs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    entry: {
        app: './src/App.js',
        button: './src/Button.js',
        buttoncss: './src/Button.scss',
        checkbox: './src/Checkbox.js',
        checkboxcss: './src/Checkbox.scss',
        chip: './src/Chip.js',
        chipset: './src/ChipSet.js',
        chip: './src/Chip.scss',
        circularprogress: './src/CircularProgress.js',
        circularprogresscss: './src/CircularProgress.scss',
        drawer: './src/Drawer.js',
        drawerdivider: './src/DrawerDivider.js',
        draweritem: './src/DrawerItem.js',
        drawercss: './src/Drawer.scss',
        list: './src/List.js',
        listitem: './src/ListItem.js',
        listcss: './src/List.scss',
        menu: './src/Menu.js',
        menudivider: './src/MenuDivider.js',
        menuitem: './src/MenuItem.js',
        menucss: './src/Menu.scss',
        radio: './src/Radio.js',
        radiocss: './src/Radio.scss',
        switch: './src/Switch.js',
        switchcss: './src/Switch.scss',
        textfield: './src/TextField.js',
        textfieldcss: './src/TextField.scss',
        togglebutton: './src/ToggleButton.js',
        togglebuttoncss: './src/ToggleButton.scss',
        topappbar: './src/TopAppBar.js',
        topappbarcss: './src/TopAppBar.scss'
    },
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin()
    ]
});
