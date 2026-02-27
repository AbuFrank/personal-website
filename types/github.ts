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

interface ProcessedLanguageData {
  name: string;
  totalLines: number;
  color: string;
}