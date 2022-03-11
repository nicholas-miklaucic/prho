import React from 'react';
import { Button, ButtonGroup } from '@blueprintjs/core';
import Cookies from 'js-cookie';

class DayNightToggle extends React.Component<{}, { isDark: boolean }> {
    constructor(props) {
        super(props);
        this.state = {
            isDark: (Cookies.get('is-dark') === 't') || (window.matchMedia("(prefers-color-scheme: dark)").matches && Cookies.get('is-dark') != 'f')
        };

        if (this.state.isDark) {
            document.body.classList.add('bp4-dark');
        }
    }

    handleSun() {
        this.setState({
            isDark: false
        });
        document.body.classList.remove('bp4-dark');
        Cookies.set('is-dark', 'f', { expires: 1, sameSite: 'strict' });
    }

    handleMoon() {
        this.setState({
            isDark: true
        });
        document.body.classList.add('bp4-dark');
        Cookies.set('is-dark', 't', { expires: 1, sameSite: 'strict' });
    }

    render() {
        return (
            <ButtonGroup id="sunmoon-grp">
                <Button
                    id="sun-btn"
                    icon="flash"
                    minimal
                    disabled={!(this.state.isDark)}
                    onClick={this.handleSun.bind(this)}>
                </Button>
                <Button
                    id="moon-btn"
                    icon="moon"
                    minimal
                    disabled={this.state.isDark}
                    onClick={this.handleMoon.bind(this)}>
                </Button>
            </ButtonGroup>
        );
    }
}

export default DayNightToggle;
