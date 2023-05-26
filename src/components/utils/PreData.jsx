const PreData = ({ jsonData }) => {
	return(
		<div className="p-4 bg-gray-600 text-white w-full rounded">
			<pre>
				{ JSON.stringify(jsonData, null, 4) }
			</pre>
		</div>
	);
};

export default PreData;