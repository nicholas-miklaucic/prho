import { Navbar, Button, Alignment } from '@blueprintjs/core';
import DayNightToggle from './DayNightToggle';
export function Menu() {
    return (
        <Navbar fixedToTop={true}>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Pollard's Rho</Navbar.Heading>
                <Navbar.Divider />
                <Button className="bp4-minimal" icon="home" text="Home" />
                <Button className="bp4-minimal" icon="document" text="Files" />
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                <DayNightToggle />
            </Navbar.Group>
        </Navbar>
    );
}
