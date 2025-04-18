type TAllowedValue = string | number | object | Array<unknown> | boolean;

type TKeyValue = {
	[key: string]: TAllowedValue;
};

export { TAllowedValue, TKeyValue };
