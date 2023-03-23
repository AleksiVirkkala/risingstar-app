import type { VisitLog } from '@prisma/client';

type InputArray = {
	x: Date;
	y: number;
	meta: VisitLog;
}[];

export const separateDataArray = (inputArray: InputArray) => {
	const output: {
		type: 'scatter';
		label: string;
		data: InputArray;
	}[] = [];
	const browsers: {
		[key: string]: {
			type: 'scatter';
			label: string;
			data: InputArray;
		};
	} = {};

	inputArray.forEach((item) => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const browser = item.meta.browser!;

		if (browsers[browser] === undefined) {
			browsers[browser] = {
				type: 'scatter',
				label: browser,
				data: [item]
			};
			output.push(browsers[browser]);
		} else {
			browsers[browser].data.push(item);
		}
	});

	return output;
};
