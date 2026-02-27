import { getGitHubStats } from "@/lib/github";
import { Suspense } from "react";
import CodingPieChart from "@/app/components/CodingPieChart";
import SkillItem from "./skill-item";
import LoadingSpinner from "../LoadingSpinner";

function SkillsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-64 bg-gray-300 rounded"></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function GitHubStats() {
  const stats = await getGitHubStats(["AbuFrank", "rthornoxford"]);


  return (
    <>
      {/* Language Breakdown */}
      <div className="py-5 sm:max-w-3/4 mx-auto">
        <h2 className="text-xl text-center font-semibold mb-1">Languages Used</h2>
        <p className="text-center font-normal text-md mb-4">(From Public Repos)</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {stats.languages.map(lang =>
            <SkillItem key={lang.name} lang={lang} />
          )}
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mb-8 sm:max-w-3/4 mx-auto">
        <h2 className="text-xl text-center font-semibold mb-4">Language Distribution</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <CodingPieChart languageData={stats.languages} />
        </div>
      </div>
    </>
  );
}

export default async function GitHubStatsPage() {
  return (
    <Suspense fallback={
      <>
        <SkillsSkeleton />
        <LoadingSpinner />
      </>
    }>
      <GitHubStats />
    </Suspense>
  );
}