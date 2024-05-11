import { CheckIcon, ClockIcon, CloudIcon } from "lucide-react";

function getIcon(name: string) {
  switch (name) {
    case "CLOCK_ICON":
      return <ClockIcon />;
    case "CHECK_ICON":
      return <CheckIcon />;
    case "CLOUD_ICON":
      return <CloudIcon />;
    default:
      return null;
  }
}

interface FeatureProps {
  id: number;
  heading: string;
  subHeading: string;
  icon: string;
}

interface FeatureSectionProps {
  id: number;
  __component: string;
  title: string;
  description: string;
  feature: FeatureProps[];
}

export function FeatureSection({data} : {readonly data: FeatureSectionProps}) {
  const { feature } = data;

  return (
    <div className="flex-1">
      <section className="container px-4 py-6 mx-auto md:px-6 lg:py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {feature.map((feature) => (
            <div key={feature.id} className="flex flex-col items-center text-center">
              {getIcon(feature.icon)}
              <h2 className="mb-4 text-2xl font-bold">{feature.heading}</h2>
              <p className="text-gray-500">{feature.subHeading}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}