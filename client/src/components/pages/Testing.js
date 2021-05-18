import React, { Fragment, useState, useRef } from 'react';
import Scanner from '../utils/Scanner';
import Result from '../utils/ScannerResult';

const Testing = () => {
	const [scanning, setScanning] = useState(false);
	const [results, setResults] = useState([]);
	const scannerRef = useRef(null);

	return (
		<div>
			<button onClick={() => setScanning(!scanning)} className='btn'>
				{scanning ? (
					<i className='fas fa-ban'></i>
				) : (
					<i className='fas fa-camera'></i>
				)}
			</button>

			<div
				ref={scannerRef}
				style={{
					position: 'relative',
					height: '100%',
					maxWidth: '100vw',
					overflow: 'clip',
					display: scanning ? 'initial' : 'none',
				}}>
				{scanning ? (
					<Fragment>
						<canvas
							className='drawingBuffer'
							style={{
								position: 'absolute',
								top: '0px',
								left: '0px',
							}}
							// width='640'
							// height='480'
						/>
						<Scanner
							scannerRef={scannerRef}
							onDetected={(result) => {
								setResults([...results, result]);
								setScanning(!scanning);
							}}
						/>
					</Fragment>
				) : null}
			</div>

			<ul className='results'>
				{results.map(
					(result) =>
						result.codeResult && (
							<Result
								key={result.codeResult.code}
								result={result}
							/>
						)
				)}
			</ul>

			<input type='scan-result' defaultValue={results} />
		</div>
	);
};

export default Testing;
