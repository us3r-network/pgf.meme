export default function GuideText({
  guides,
}: {
  guides: Array<{
    title: string;
    description: string;
    guides?: Array<{ title: string; description: string }>;
  }>;
}) {
  return (
    <div className="flex flex-col gap-8">
      {guides.map((guide, index) => {
        return (
          <div key={index} className="flex flex-col gap-4">
            <span className="text-secondary text-2xl font-bold">
              {index + 1}. {guide.title}
            </span>
            <span className="text-2xl font-normal">{guide.description}</span>
            {guide?.guides &&
              guide.guides.map((g, i) => {
                return (
                  <div key={i} className="flex flex-col gap-4">
                    <span className="text-secondary text-2xl font-bold">
                      . {g.title}
                    </span>
                    <span className="text-2xl font-normal">
                      {g.description}
                    </span>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
