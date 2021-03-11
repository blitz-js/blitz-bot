import { Webhooks } from "@octokit/webhooks";
import log from "@/utils/log";

import { issuesLabeled } from "@/events/issues-labeled";
import { project_cardMoved } from "@/events/project_card-moved";
import { issuesOpened } from "@/events/issues-opened";
import { pull_requestOpened } from "@/events/pull_request-opened";
import { pull_requestLabeled } from "@/events/pull_request-labeled";
import { issue_commentCreated } from "@/events/issue_comment-created";
import { pull_requestClosed } from "@/events/pull_request-closed";
import { issuesAssigned } from "@/events/issues-assigned";

const app = new Webhooks({
  secret: process.env.WEBHOOK_SECRET,
});

app.onAny((event) => {
  // @ts-expect-error
  log.info(`Recived ${event.name}.${event.payload?.action || "any"}`);
});

app.on("issues.opened", issuesOpened);
app.on("issues.labeled", issuesLabeled);
app.on(["project_card.moved", "project_card.created"], project_cardMoved);
app.on(
  ["pull_request.opened", "pull_request.ready_for_review"],
  pull_requestOpened
);
app.on("pull_request.labeled", pull_requestLabeled);
app.on("pull_request.closed", pull_requestClosed);
app.on("issue_comment.created", issue_commentCreated);
app.on("issues.assigned", issuesAssigned);

export default app;
