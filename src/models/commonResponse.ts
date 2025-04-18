import { TAllowedValue, TKeyValue } from './types.js';

class ICommonResponse {
	success: boolean = false;
	message: string = '';
	result?: TKeyValue[] | TAllowedValue = [];
}

export default ICommonResponse;
