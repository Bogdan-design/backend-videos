export type OutputErrorsType = {
	errorsMessages: ErrorsMessage[];
}
export type ErrorsMessage = {
	message: string;
	field: string;
}