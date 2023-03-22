import { PrismaClient, type VisitLog } from '@prisma/client';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import browserDetect from 'browser-detect';
import type { BrowserDetectInfo } from 'browser-detect/dist/types/browser-detect.interface';

const prisma = new PrismaClient();

export const GET: RequestHandler = async (opts) => {
	// Add visit log
	const browserInfo = getBrowserInfo(opts.request);
	await addVisitLog(browserInfo);

	// Return all visit logs
	const logs = await prisma.visitLog.findMany();
	return json(logs);
};

const addVisitLog = async (browserInfo: BrowserDetectInfo = {}) => {
	const { name: browser, mobile, os, version } = browserInfo;

	try {
		await prisma.visitLog.create({
			data: {
				browser,
				mobile,
				os,
				version
			}
		});
	} catch (e) {
		console.error(e);
	}
	await prisma.$disconnect();
	const logs = await prisma.visitLog.findMany();
	return json(logs);
};

const getBrowserInfo = (req) => {
	const browserInfo = browserDetect(req.headers.get('user-agent') || undefined);
	return browserInfo;
};
