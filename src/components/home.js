import { useState, useEffect } from 'react';

export default function Home(props) {
    const [randomMeme, setRandomMeme] = useState({});

    const getRandomMeme = () => {
        fetch('/api/random-meme')
        .then(res => res.json())
        .then(json => setRandomMeme(json.image))
    }

    useEffect(() => {
        getRandomMeme();
    }, [])

    return (
        <div style={{display: "grid", justifyItems: "center", minHeight: "calc(100vh - 63px", alignContent: "center"}}>
            <h1 className="text-uppercase" style={{textAlign: "center"}}>
                <span className="backdrop-item">Vítejte</span>
                <span className="backdrop-item">na</span>
                <span className="backdrop-item">perFEKTním</span>
                <span className="backdrop-item">drillu</span>
            </h1>
            <a href="/xpc/elb/kt"><button>XPC-ELB/KT shortcut</button></a>
            <a href="/xpc/elb/zt"><button>XPC-ELB/ZT shortcut</button></a>
            <a href="/bpc/psd/lc/kt"><button>BPC-PSD/LC/KT shortcut</button></a>
            <img alt={randomMeme.name} src={randomMeme.path} style={{maxHeight: "70vh", maxWidth: "100%"}} />
        </div>
    )
}
