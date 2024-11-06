export type OutputErrorsType = {
	errorsMessages: ErrorsMessage[];
}
type ErrorsMessage = {
	message: string;
	field: string;
}