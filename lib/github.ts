import { Octokit } from "@octokit/core";

export async function getGitHubStats(username: string) {
  // Add cache for better performance
  const cacheKey = `github-stats-${username}`;

  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_PAT,
    });

    const response = await octokit.graphql(
      `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionCalendar {
              totalContributions
            }
          }
          repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
            nodes {
              name
              languages(first: 100) {
                edges {
                  node {
                    name
                    color
                  }
                  size
                }
              }
            }
          }
        }
      }
    `,
      {
        username,
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    throw new Error("Failed to fetch GitHub statistics");
  }
}