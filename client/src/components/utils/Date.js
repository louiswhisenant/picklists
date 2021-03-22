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

export const timeTaken = (dateCreated, dateCompleted) => {
	const start = new Date(dateCreated).valueOf();
	const end = new Date(dateCompleted).valueOf();
	const elapsed = end - start;
	return Math.floor(elapsed / 1000);
};
