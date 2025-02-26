import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "duration",
})
export class DurationPipe implements PipeTransform {
	transform(value: any, ...args: any[]) {
		const duration = value;
		if (!duration) return "00:00";

		const hours = Math.floor(duration / 60);
		const minutes = duration % 60;

		// Format hours and minutes to always have two digits
		const formattedHours = String(hours).padStart(2, "0");
		const formattedMinutes = String(minutes).padStart(2, "0");

		return `${formattedHours}:${formattedMinutes}`;
	}
}
