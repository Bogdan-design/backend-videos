export type ResolutionVideoTypes =  "P144" | "P240" | "P360"| "P480"| "P720"| "P1080"| "P1440"| "P2160"

export type InputVideoType = {
	title: string;
	author: string;
	availableResolutions: ResolutionVideoTypes[];
}

export enum Resolutions {
    P144="P144",
    P240="P240",
    P360="P360",
    P480="P480",
    P720="P720",
    P1080="P1080",
    P1440="P1440",
    P2160="P2160"
}