import { ActivityCalendar } from 'react-activity-calendar';
import rawContributions from './contributions.json';

const GithubContributions = ({ isRudraMode, theme }) => {
  if (isRudraMode) return null; // Rudra mode hides to focus on terminal

  // Process actual 2D week-level contributions from github-contributions-api into a flat array
  const processedData = rawContributions.contributions.flat().map(item => {
    let level = 0;
    const count = item.contributionCount;
    if (count > 0) {
      if (count <= 3) level = 1;
      else if (count <= 8) level = 2;
      else if (count <= 15) level = 3;
      else level = 4;
    }
    return {
      date: item.date,
      count: count,
      level: level
    };
  });

  // Unique luxurious indigo-cyan color scheme so it looks premium and distinct
  const themeColors = {
    light: ['#f1f5f9', '#c7d2fe', '#818cf8', '#4f46e5', '#3730a3'],
    dark: ['#1e1b4b', '#312e81', '#4338ca', '#4f46e5', '#6366f1']
  };

  return (
    <section className="px-6 py-12 sm:py-16 relative border-t border-[var(--border)] transition-colors duration-300" data-section="github-contributions" data-github-user="Tanish-Anand1">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6 gap-2">
          <h2 className="text-[var(--foreground)] text-3xl font-bold font-serif">Github Contributions</h2>
          <span className={`text-sm font-mono rounded-full px-3 py-1 font-semibold w-fit border transition-all duration-300 ${
            theme === 'light'
              ? 'text-indigo-600 bg-indigo-50 border-indigo-100'
              : 'text-indigo-300 bg-indigo-950/50 border-indigo-900/30'
          }`}>
            {rawContributions.totalContributions.toLocaleString()} commits in the last year
          </span>
        </div>
        <div className="flex justify-center md:justify-start overflow-x-auto pb-4 custom-scrollbar">
          <div className="min-w-[800px] md:min-w-0 pr-4">
            <ActivityCalendar 
              data={processedData}
              theme={themeColors}
              labels={{
                totalCount: '{{count}} contributions in the last year',
              }}
              fontSize={13}
              blockSize={12}
              blockMargin={3}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubContributions;
