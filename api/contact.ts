import { handleContact, type ContactEnv } from '../server/contact'
declare const process: { env: ContactEnv }
export function POST(request: Request) { return handleContact(request, process.env) }
