
import { useState, useEffect } from "react";

interface GithubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
  payload?: any;
}

export function useGithubActivity(username: string, limit: number = 5) {
  const [activities, setActivities] = useState<GithubEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGithubActivity() {
      try {
        setLoading(true);
        const response = await fetch(`https://api.github.com/users/${username}/events/public?per_page=${limit}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch GitHub activity: ${response.status}`);
        }
        
        const data = await response.json();
        setActivities(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching GitHub activity:", err);
        setError("Failed to load GitHub activity. Please try again later.");
        setActivities([]);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchGithubActivity();
    }
  }, [username, limit]);

  // Format event for display
  const formatEvent = (event: GithubEvent) => {
    switch (event.type) {
      case "PushEvent":
        return {
          action: "pushed to",
          repo: event.repo.name,
          details: event.payload?.commits?.length 
            ? `${event.payload.commits.length} commit(s)` 
            : "",
          date: new Date(event.created_at).toLocaleDateString(),
          time: new Date(event.created_at).toLocaleTimeString()
        };
      
      case "PullRequestEvent":
        return {
          action: `${event.payload?.action} pull request in`,
          repo: event.repo.name,
          details: event.payload?.pull_request?.title || "",
          date: new Date(event.created_at).toLocaleDateString(),
          time: new Date(event.created_at).toLocaleTimeString()
        };
      
      case "IssueCommentEvent":
        return {
          action: "commented on issue in",
          repo: event.repo.name,
          details: event.payload?.issue?.title || "",
          date: new Date(event.created_at).toLocaleDateString(),
          time: new Date(event.created_at).toLocaleTimeString()
        };
      
      case "CreateEvent":
        return {
          action: `created ${event.payload?.ref_type || "repository"}`,
          repo: event.repo.name,
          details: event.payload?.ref || "",
          date: new Date(event.created_at).toLocaleDateString(),
          time: new Date(event.created_at).toLocaleTimeString()
        };
      
      default:
        return {
          action: "acted on",
          repo: event.repo.name,
          details: "",
          date: new Date(event.created_at).toLocaleDateString(),
          time: new Date(event.created_at).toLocaleTimeString()
        };
    }
  };

  const formattedActivities = activities.map(formatEvent);

  return { activities: formattedActivities, loading, error };
}
