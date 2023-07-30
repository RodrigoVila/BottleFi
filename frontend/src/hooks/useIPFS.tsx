import { useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';

export const useIPFS = () => {
    const [IPFS, setIPFS] = useState<any>();
    const [fileBuffer, setFileBuffer] = useState<any>(null);
    const [tokenURI, setTokenURI] = useState('');

    const handleFileInput = (e) => {
        e.preventDefault();
        const data = e.target.files[0];
        const fileReader: FileReader = new window.FileReader();
        fileReader.readAsArrayBuffer(data);
        //@ts-ignore-next-line
        fileReader.onloadend = () => setFileBuffer(Buffer.from(fileReader.result));
    };

    const uploadFileToIPFS = async () => {
        try {
            const created = await IPFS.add(fileBuffer);
            const url = `https://ipfs.infura.io/ipfs/${created.path}`;
            return url;
        } catch (error) {
            return false;
        }
    };

    const uploadMetadataToIPFS = async (
        name: string,
        description: string,
        fileURI: string
    ) => {
        if (fileURI) {
            const metaObj = {
                name,
                description,
                fileURI,
            };
            const strObj = JSON.stringify(metaObj);

            try {
                const created = await IPFS.add(strObj);
                const url = `https://ipfs.infura.io/ipfs/${created.path}`;
                setTokenURI(url);
                return url;
            } catch (error) {
                console.error('Error on uploadMetadataToIPFS: ', error);
                return false;
            }
        }
    };

    useEffect(() => {
        const init = async () => {
            const instance = create({
                url: 'https://ipfs.infura.io:5001',
            });
            setIPFS(instance);
        };
        init();
        //eslint-disable-next-line
    }, []);

    return {
        fileBuffer,
        tokenURI,
        handleFileInput,
        uploadFileToIPFS,
        uploadMetadataToIPFS,
    };
};
