export async function getGitHubStats(usernames: string[]) {

  type PatMap = {
    AbuFrank: string | undefined;
    rthornoxford: string | undefined;
  };

  const patMap: PatMap = {
    "AbuFrank": process.env.GITHUB_PAT,
    "rthornoxford": process.env.GITHUB_OC_PAT,
  };

  try {
    // Create an array of fetch promises for each account
    const fetchPromises = usernames.map(async (username: string) => {
      const pat = patMap[username as keyof PatMap];
      if (!pat) {
        throw new Error(`No PAT found for user: ${username}`);
      }

      const query = `
        query($user: String!) {
          user(login: $user) {
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
      `;

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${pat}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { user: username }
        }),
        next: {
          tags: ['github-stats', username],
          revalidate: 43200, // 12 hours in seconds
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub GraphQL error for ${username}: ${response.status}`);
      }

      return response.json();
    });

    // Wait for all requests to complete
    const results = await Promise.allSettled(fetchPromises);

    // Process successful responses and collect data
    const mergedData = {
      users: [] as any[],
      languages: {} as Record<string, { totalLines: number; color: string }>
    };

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const userData = result.value.data.user;
        const username = usernames[index];

        if (userData) {
          mergedData.users.push({
            username,
            ...userData
          });

          // Process languages from this user's repositories
          if (userData.repositories?.nodes) {
            userData.repositories.nodes.forEach((repo: RepositoryNode) => {
              if (repo.languages?.edges) {
                repo.languages.edges.filter((langEdge: LanguageEdge) => langEdge.node.name !== "Hack").forEach((langEdge: any) => {
                  const langName = langEdge.node.name;
                  const langColor = langEdge.node.color;
                  const size = langEdge.size || 0;

                  if (!mergedData.languages[langName]) {
                    mergedData.languages[langName] = {
                      totalLines: 0,
                      color: langColor
                    };
                  }
                  mergedData.languages[langName].totalLines += size;
                });
              }
            });
          }
        }
      } else {
        console.error(`Failed to fetch data for user ${usernames[index]}:`, result.reason);
      }
    });

    return {
      users: mergedData.users,
      languages: Object.entries(mergedData.languages)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.totalLines - a.totalLines)
    };

  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    throw new Error("Failed to fetch GitHub statistics");
  }
}