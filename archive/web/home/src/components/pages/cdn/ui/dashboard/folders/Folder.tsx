import Link from 'next/link';
import { MdFolder } from 'react-icons/md';
import { Folder as FolderType } from 'src/hooks/useFolder';

export default function Folder({ folder }: { folder: FolderType }) {
    return (
        <Link href={`/cdn/folder?id=${folder.id}`}>
            <a
                aria-label={`Go to your ${folder.name} folder`}
                role='gridcell'
                href={`/cdn/folder?id=${folder.id}`}
                className='flex w-[13rem] items-center justify-start space-x-2 rounded-md border py-3 pl-4 md:w-[16rem]'
            >
                <MdFolder className='text-xl' style={{ color: folder.color! }} />
                <h2 className='text-sm font-medium'>{folder.name.length > 20 ? `${folder.name.slice(0, 20)}...` : folder.name}</h2>
            </a>
        </Link>
    );
}
