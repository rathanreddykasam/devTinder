import { TAllowedValue, TKeyValue } from '../types.js';

export interface ICommonResponse {
	success: boolean;
	message: string;
	result?: TKeyValue[] | TAllowedValue;
}
