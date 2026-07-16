import { Effect } from "effect";
import { Command } from "effect/unstable/cli";
import { listDashboardProjects } from "../project-list.ts";
import { browseDashboards } from "./browse-dashboards.ts";

export const dashboardCommand = Command.make(
	"dashboard",
	{},
	Effect.fnUntraced(function* () {
		const projects = yield* listDashboardProjects;

		yield* browseDashboards({ title: "Projects", projects });
	}),
).pipe(Command.withDescription("Browse project dashboards in the terminal UI"));
