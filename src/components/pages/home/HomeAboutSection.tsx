/* eslint-disable @next/next/no-img-element */
import { Images } from '@assets/images';
import Link from '@ui/Link/Link';

export default function HomeAboutSection() {
    return (
        <section id='about' className='flex h-[900px] flex-col items-center justify-evenly bg-gray-50 md:flex-row'>
            <img width={414} height={414} className='hidden md:block' src={Images.Reese} alt='Me' />
            <div className='flex flex-col items-center md:block'>
                <img width={340} height={340} src={Images.Reese} className='mb-5 md:hidden' alt='Me' />
                <h2 className='text-3xl font-normal text-gray-600'>About me</h2>
                <p className='text-gray-700'>Read a bit about me and what I like to do.</p>
                <Link
                    href='/about-me'
                    className='mt-5 rounded-md border border-gray-500 bg-white px-5 py-3 text-blue-500 transition-[color,background-color,border-color] duration-200 hover:border-blue-500 hover:bg-blue-50'
                >
                    Read now
                </Link>
            </div>
        </section>
    );
}
