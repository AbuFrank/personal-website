interface GitHubStats {
  user: {
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: {
          contributionDays: {
            date: string;
            contributionCount: number;
          }[];
        }[];
      };
    };
    repositories: {
      nodes: RepositoryNode[];
    };
  };
}

interface RepositoryNode {
  name: string;
  languages: {
    edges: LanguageEdge[];
  };
}

interface LanguageEdge {
  node: {
    name: string;
    color: string;
  };
  size: number;
}

// Alternative more specific interface for the processed data
interface ProcessedLanguageData {
  name: string;
  totalLines: number;
  color: string;
}