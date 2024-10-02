import { ClientOpts } from 'twilio';
declare const _default: (() => {
    username: string;
    password: string;
    otps?: ClientOpts;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    username: string;
    password: string;
    otps?: ClientOpts;
}>;
export default _default;
