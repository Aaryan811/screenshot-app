// App.js
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { useScreenshot } from 'use-react-screenshot';
import logo from './logo512.png'

const App = () => {
    const ref = useRef(null);
    const [image, takeScreenshot] = useScreenshot();

    const captureScreenshot = async () => {
        const canvas = await html2canvas(ref.current);
        const imgData = canvas.toDataURL('image/png');
        takeScreenshot(ref.current);

        // Create a link element, set the download attribute, and click it to download the image
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'screenshot.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const triggerPrintDialog = () => {
        window.print();
    };

    return (
        <div>
            <div ref={ref} style={{ padding: 20, backgroundColor: 'orange' }}>
                <h1>Hello, world!</h1>
                <p>This is a sample content to capture as a screenshot.</p>
                <img src={logo} alt="Placeholder" />
            </div>
            <button onClick={captureScreenshot}>Capture Screenshot</button>
            <button onClick={triggerPrintDialog}>Print Screen</button>
            {image && (
                <div>
                    <h2>Screenshot:</h2>
                    <img src={image} alt="Screenshot" />
                </div>
            )}
        </div>
    );
};

export default App;
