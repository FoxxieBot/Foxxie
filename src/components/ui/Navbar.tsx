import BaseNavbar, { Link } from './BaseNavbar';

const Links: Link[] = [
    {
        text: 'About',
        path: '/about-me'
    },
    {
        text: 'My Work',
        path: '/my-work'
    },
    {
        text: 'Contact',
        path: '/contact-me'
    }
];

export default function Navbar() {
    return (
        <>
            <BaseNavbar links={Links} title='.cafe' href='/' />
        </>
    );
}
