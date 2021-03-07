export const formatDateAndTimeCST = (dateString) => {
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		timeZone: 'America/Chicago',
		hour: '2-digit',
		minute: '2-digit',
	};
	return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatTimeCST = (dateString) => {
	const options = {
		timeZone: 'America/Chicago',
		hour: '2-digit',
		minute: '2-digit',
	};
	return new Date(dateString).toLocaleDateString(undefined, options);
};
